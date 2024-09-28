import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as MplPolygon
from shapely.geometry import Point, Polygon
import heapq
from itertools import permutations
import time
from tqdm import tqdm
rest_time=120
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
    return np.sqrt((a[0] - b[0])**2 + (a[1] - b[1])**2)

def get_neighbors(grid, position):
    x, y = position
    neighbors = []
    for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]:
        nx, ny = x + dx, y + dy
        if 0 <= nx < grid.shape[0] and 0 <= ny < grid.shape[1] and grid[nx, ny] == 0:
            neighbors.append((nx, ny))
    return neighbors

def a_star(grid, start, goal):
    start_node = Node(start, h=euclidean_distance(start, goal))
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

            move_cost = 1 if (neighbor_pos[0] - current_node.position[0])**2 + (neighbor_pos[1] - current_node.position[1])**2 == 1 else 1.414

            neighbor = Node(neighbor_pos, 
                            g=current_node.g + move_cost, 
                            h=euclidean_distance(neighbor_pos, goal), 
                            parent=current_node)

            if neighbor_pos in open_set:
                existing = open_set[neighbor_pos]
                if neighbor.g < existing.g:
                    existing.g = neighbor.g
                    existing.f = neighbor.f
                    existing.parent = current_node
                    heapq.heapify(open_heap)
            else:
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
            for j in range(i+1, n):
                path = a_star(grid, points[i], points[j])
                if path is None:
                    distances[i, j] = distances[j, i] = float('inf')
                else:
                    distances[i, j] = distances[j, i] = len(path) - 1
                    paths[(i, j)] = paths[(j, i)] = path
                pbar.update(1)
    
    return distances, paths

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
            total_time += move_time + rest_time  # Move time + Rest time
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
        if nodes_explored % 1000 == 0:
            elapsed_time = time.time() - start_time
            print(f"Nodes explored: {nodes_explored}, Best time so far: {best_max_time:.2f}, Time elapsed: {elapsed_time:.2f}s")

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

            total_time, path = calculate_optimal_path_time(ugv_indices[depth], list(combination), distances)
            new_times = current_times + [total_time]
            new_max_time = max(new_times)

            if new_max_time < best_max_time:
                current_assignment.append(list(combination))
                current_paths.append(path)
                backtrack(depth + 1, current_assignment, new_remaining_targets, new_times, current_paths)
                current_assignment.pop()
                current_paths.pop()

    print("Starting branch and bound...")
    backtrack(0, [], target_indices, [], [])
    print(f"Branch and bound completed. Total nodes explored: {nodes_explored}")

    optimal_times = []
    optimal_paths = []
    for i, assignment in enumerate(best_assignment):
        optimal_time, optimal_path = calculate_optimal_path_time(ugv_indices[i], assignment, distances)
        optimal_times.append(optimal_time)
        optimal_paths.append(optimal_path)

    best_max_time = max(optimal_times)

    return best_assignment, best_max_time, optimal_paths

def read_coordinates(filename):
    with open(filename, 'r') as f:
        return [tuple(map(float, line.strip().split(','))) for line in f]

def lat_lon_to_xy(lat, lon, min_lat, min_lon):
    R = 6371000  # Earth's radius in meters
    x = R * np.radians(lon - min_lon) * np.cos(np.radians(min_lat))
    y = R * np.radians(lat - min_lat)
    return x, y

def create_grid(geofence_xy, all_points_xy, scale=1):
    min_x = min(min(p[0] for p in geofence_xy), min(p[0] for p in all_points_xy))
    max_x = max(max(p[0] for p in geofence_xy), max(p[0] for p in all_points_xy))
    min_y = min(min(p[1] for p in geofence_xy), min(p[1] for p in all_points_xy))
    max_y = max(max(p[1] for p in geofence_xy), max(p[1] for p in all_points_xy))

    width = int((max_x - min_x) / scale) + 1
    height = int((max_y - min_y) / scale) + 1

    grid = np.zeros((width, height), dtype=int)
    geofence_polygon = Polygon(geofence_xy)

    for x in range(width):
        for y in range(height):
            point = Point(min_x + x * scale, min_y + y * scale)
            if not geofence_polygon.contains(point):
                grid[x, y] = 1

    return grid, (min_x, min_y, scale)

def coordinate_to_grid(coord, grid_info):
    min_x, min_y, scale = grid_info
    return int((coord[0] - min_x) / scale), int((coord[1] - min_y) / scale)

def grid_to_coordinate(grid_pos, grid_info):
    min_x, min_y, scale = grid_info
    return min_x + grid_pos[0] * scale, min_y + grid_pos[1] * scale

# Read input files
geofence = read_coordinates('geofence.txt')
ugv_positions = read_coordinates('ugv_positions.txt')
target_points = read_coordinates('waypoints.txt')

all_points = ugv_positions + target_points

# Convert coordinates to x, y
min_lat = min(min(p[0] for p in geofence), min(p[0] for p in all_points))
min_lon = min(min(p[1] for p in geofence), min(p[1] for p in all_points))

geofence_xy = [lat_lon_to_xy(lat, lon, min_lat, min_lon) for lat, lon in geofence]
all_points_xy = [lat_lon_to_xy(lat, lon, min_lat, min_lon) for lat, lon in all_points]
ugv_xy = all_points_xy[:len(ugv_positions)]
target_xy = all_points_xy[len(ugv_positions):]

# Create grid
grid, grid_info = create_grid(geofence_xy, all_points_xy)

# Convert coordinates to grid positions
grid_positions = [coordinate_to_grid(point, grid_info) for point in all_points_xy]

# Compute distance matrix
print("Computing distance matrix...")
start_time = time.time()
distances, paths = compute_distance_matrix(grid_positions, grid)
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

# Write assignments to files
for i, assignment in enumerate(assignments):
    with open(f'waypointsr{i+1}.txt', 'w') as f:
        for target_index in assignment:
            target_coord = all_points[target_index]
            f.write(f"{target_coord[0]},{target_coord[1]}\n")

# Visualization
fig, ax = plt.subplots(figsize=(10, 10))

# Plot geofence
geofence_poly = MplPolygon(geofence_xy, fill=False, edgecolor='black')
ax.add_patch(geofence_poly)

# Plot UGV positions
ugv_x, ugv_y = zip(*ugv_xy)
ax.scatter(ugv_x, ugv_y, c='red', s=100, marker='^', label='UGV Positions')

# Plot target points
target_x, target_y = zip(*target_xy)
ax.scatter(target_x, target_y, c='blue', s=100, marker='o', label='Target Points')

# Plot assignments and paths
colors = ['r', 'g', 'b']
for i, path_indices in enumerate(optimal_paths):
    # Plot A* paths
    for k in range(len(path_indices) - 1):
        start = grid_positions[path_indices[k]]
        end = grid_positions[path_indices[k + 1]]
        a_star_path = paths[(path_indices[k], path_indices[k + 1])]
        path_xy = [grid_to_coordinate(pos, grid_info) for pos in a_star_path]
        path_x, path_y = zip(*path_xy)
        ax.plot(path_x, path_y, color=colors[i], linewidth=2, alpha=0.7)
    
    # Plot optimal path
    optimal_path_xy = [all_points_xy[idx] for idx in path_indices]
    optimal_x, optimal_y = zip(*optimal_path_xy)
    ax.plot(optimal_x, optimal_y, color=colors[i], linestyle='--', linewidth=1, alpha=0.5, label=f'UGV {i+1} Path')

ax.set_aspect('equal', 'box')
ax.set_xlabel('X (meters)')
ax.set_ylabel('Y (meters)')
ax.set_title('UGV Assignments and Paths')
ax.legend()

plt.tight_layout()
plt.show()

plt.savefig('path.png')

# Print summary
print("\nAssignments:")
for i, assignment in enumerate(assignments):
    print(f"UGV {i+1}: {[all_points[j] for j in assignment]}")
print(f"Maximum path time: {max_path_time}")
