import heapq
import numpy as np
from itertools import permutations
import matplotlib.pyplot as plt
from tqdm import tqdm
import time


# Function to convert lat/lon to Cartesian coordinates (x, y) in meters
def latlon_to_cartesian(lat, lon, lat_origin, lon_origin):
    # Approximate Earth radius in kilometers (mean radius)
    R = 6371.0 * 1000  # Convert radius to meters
    
    # Convert lat/lon from degrees to radians
    lat = np.radians(lat)
    lon = np.radians(lon)
    lat_origin = np.radians(lat_origin)
    lon_origin = np.radians(lon_origin)
    
    # Calculate differences
    delta_lat = lat - lat_origin
    delta_lon = lon - lon_origin
    
    # Vectorized x and y coordinate calculations in meters
    x = R * delta_lon * np.cos(lat_origin)  # Lon distance (in meters)
    y = R * delta_lat  # Lat distance (in meters)
    
    return x, y

def cartesian_to_latlon(x, y, lat_origin, lon_origin):
    # Approximate Earth radius in kilometers (mean radius)
    R = 6371.0 * 1000  # Convert radius to meters
    
    # Convert lat/lon from degrees to radians
    lat_origin = np.radians(lat_origin)
    lon_origin = np.radians(lon_origin)
    
    # Vectorized lat and lon calculations in degrees
    lat = np.degrees(y / R) + lat_origin
    lon = np.degrees(x / (R * np.cos(lat_origin))) + lon_origin


def ugv_path_planning(grid_size, ugv_positions, target_positions, rest_time=120):
    class Node:
        def __init__(self, position, g=0, h=0, parent=None):
            self.position = position
            self.g = g
            self.h = h
            self.f = g + h
            self.parent = parent

        def __lt__(self, other):
            return self.f < other.f

        def __eq__(self, other):
            return self.position == other.position

        def __hash__(self):
            return hash(self.position)

    def euclidean_distance(a, b):
        return np.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)

    def get_neighbors(grid, position):
        x, y = position
        neighbors = []
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < grid.shape[0] and 0 <= ny < grid.shape[1]:
                neighbors.append((nx, ny))
        return neighbors

    def dijkstra(grid, start, goal):
        start_node = Node(start)
        open_heap = [start_node]
        open_set = {start: start_node}
        closed_set = set()

        while open_heap:
            current_node = heapq.heappop(open_heap)
            del open_set[current_node.position]

            if current_node.position == goal:
                path = []
                while current_node:
                    path.append(current_node.position)
                    current_node = current_node.parent
                return path[::-1]

            closed_set.add(current_node.position)

            for neighbor_pos in get_neighbors(grid, current_node.position):
                if neighbor_pos in closed_set:
                    continue

                move_cost = 1 if (neighbor_pos[0] - current_node.position[0]) ** 2 + (
                            neighbor_pos[1] - current_node.position[1]) ** 2 == 1 else 1.414

                neighbor = Node(neighbor_pos,
                                g=current_node.g + move_cost,
                                parent=current_node)

                if neighbor_pos in open_set:
                    existing = open_set[neighbor_pos]
                    if neighbor.g < existing.g:
                        existing.g = neighbor.g
                        existing.f = neighbor.g
                        existing.parent = current_node
                        heapq.heapify(open_heap)
                else:
                    neighbor.f = neighbor.g
                    heapq.heappush(open_heap, neighbor)
                    open_set[neighbor_pos] = neighbor

        return None

    def compute_distance_matrix(points, grid):
        n = len(points)
        distances = np.zeros((n, n))
        paths = {}
        total_computations = n * (n - 1) // 2

        with tqdm(total=total_computations, desc="Computing distances") as pbar:
            for i in range(n):
                for j in range(i + 1, n):
                    path = dijkstra(grid, points[i], points[j])
                    if path is None:
                        distances[i, j] = distances[j, i] = float('inf')
                    else:
                        distances[i, j] = distances[j, i] = len(path) - 1
                        paths[(i, j)] = paths[(j, i)] = path
                    pbar.update(1)

        return distances, paths

    def calculate_greedy_path_time(start_index, targets, distances):
        current = start_index
        total_time = 0
        path = [current]
        targets = list(targets)

        while targets:
            next_target = min(targets, key=lambda t: distances[current][t])
            move_time = distances[current][next_target]
            total_time += move_time + rest_time
            current = next_target
            path.append(current)
            targets.remove(next_target)

        return total_time, path

    def calculate_optimal_path_time(start_index, targets, distances):
        best_time = float('inf')
        best_path = None
        start = start_index
        targets = list(targets)

        for perm in permutations(targets):
            current = start
            total_time = 0
            path = [current]

            for target in perm:
                move_time = distances[current][target]
                total_time += move_time + rest_time
                current = target
                path.append(current)

            if total_time < best_time:
                best_time = total_time
                best_path = path

        return best_time, best_path

    def branch_and_bound(ugv_indices, target_indices, distances):
        n_ugvs = len(ugv_indices)
        n_targets = len(target_indices)

        best_assignment = None
        best_max_time = float('inf')
        best_paths = None

        nodes_explored = 0
        start_time = time.time()

        def backtrack(depth, current_assignment, remaining_targets, current_times, current_paths):
            nonlocal best_assignment, best_max_time, best_paths, nodes_explored

            nodes_explored += 1

            if depth == n_ugvs:
                if not remaining_targets:
                    current_max_time = max(current_times)
                    if current_max_time < best_max_time:
                        best_assignment = current_assignment.copy()
                        best_max_time = current_max_time
                        best_paths = current_paths.copy()
                return

            for i in range(len(remaining_targets) + 1):
                combination = remaining_targets[:i]
                new_remaining_targets = remaining_targets[i:]

                total_time, path = calculate_greedy_path_time(ugv_indices[depth], list(combination), distances)
                new_times = current_times + [total_time]
                new_max_time = max(new_times)

                if new_max_time < best_max_time:
                    current_assignment.append(list(combination))
                    current_paths.append(path)
                    backtrack(depth + 1, current_assignment, new_remaining_targets, new_times, current_paths)
                    current_assignment.pop()
                    current_paths.pop()

        backtrack(0, [], target_indices, [], [])

        if best_assignment is None:
            return [], float('inf'), []

        optimal_times = []
        optimal_paths = []
        for i, assignment in enumerate(best_assignment):
            optimal_time, optimal_path = calculate_optimal_path_time(ugv_indices[i], assignment, distances)
            optimal_times.append(optimal_time)
            optimal_paths.append(optimal_path)

        best_max_time = max(optimal_times)

        return best_assignment, best_max_time, optimal_paths

    # Create a grid (no obstacles)
    grid = np.zeros((grid_size, grid_size), dtype=int)

    # Compute distance matrix
    print("Computing distance matrix...")
    all_points = ugv_positions + target_positions
    start_time = time.time()
    distances, paths = compute_distance_matrix(all_points, grid)
    end_time = time.time()
    print(f"Distance matrix computation completed in {end_time - start_time:.2f} seconds")

    # Find optimal assignment using branch and bound
    ugv_indices = list(range(len(ugv_positions)))
    target_indices = list(range(len(ugv_positions), len(all_points)))

    print("Starting optimal assignment search...")
    start_time = time.time()
    assignments, max_path_time, optimal_paths = branch_and_bound(ugv_indices, target_indices, distances)
    end_time = time.time()
    print(f"Optimal assignment found in {end_time - start_time:.2f} seconds")

    print("\nAssignments:")
    for i, assignment in enumerate(assignments):
        print(f"UGV {i}: {[all_points[j] for j in assignment]}")
    print(f"Maximum path time: {max_path_time}")

    # Visualization
    plt.figure(figsize=(10, 10))
    plt.imshow(grid.T, cmap='binary')

    colors = ['r', 'g', 'b']
    markers = ['o', 's', '^']

    for i, path_indices in enumerate(optimal_paths):
        for k in range(len(path_indices) - 1):
            start = all_points[path_indices[k]]
            end = all_points[path_indices[k + 1]]
            start_index = path_indices[k]
            end_index = path_indices[k + 1]
            a_star_path = paths[(start_index, end_index)]
            path_array = np.array(a_star_path)
            plt.plot(path_array[:, 0], path_array[:, 1], color=colors[i], linewidth=2, alpha=0.7)

        optimal_path_array = np.array([all_points[idx] for idx in path_indices])
        plt.plot(optimal_path_array[:, 0], optimal_path_array[:, 1], color=colors[i], linestyle='--', linewidth=1,
                 alpha=0.5)

        start_point = all_points[path_indices[0]]
        plt.plot(start_point[0], start_point[1], color=colors[i], marker=markers[i], markersize=10, label=f'UGV {i} Start')
        for target_index in path_indices[1:]:
            target = all_points[target_index]
            plt.plot(target[0], target[1], color=colors[i], marker='*', markersize=10)

    plt.title('UGV Paths (A* and Optimal) and Assigned Targets')
    plt.legend()
    plt.grid(True)
    plt.gca().invert_yaxis()
    plt.savefig('ugv_paths.png')
    plt.show()

def pathmain():
    # Load waypoints from file into numpy arrays
    waypoints = np.loadtxt('waypoints.txt', delimiter=',')
    lats, lons = waypoints[:, 0], waypoints[:, 1]

    # Origin point (can be adjusted)
    lat_origin = 28.75342705639587
    lon_origin = 77.11610768049533

    # Convert lat/lon to Cartesian coordinates using vectorization (in meters)
    x_coords, y_coords = latlon_to_cartesian(lats, lons, lat_origin, lon_origin)

    # Grid size
    grid_size = 40

    # UGV positions
    ugv_positions = [(0, 0), (0, 0), (0, 0)]

    # Target positions
    target_positions = list(zip(x_coords, y_coords))
    print(target_positions)

    # Path planning
    ugv_path_planning(grid_size, ugv_positions, target_positions)

pathmain()