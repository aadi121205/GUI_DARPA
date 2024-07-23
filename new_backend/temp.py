import scipy.io
import matplotlib.pyplot as plt
import numpy as np
import random
# Path to your .mat file
file_path = '/home/akshit/Downloads/Cuprite_f970619t01p02_r02_sc03.a.rfl.mat'

# Load the .mat file
mat_contents = scipy.io.loadmat(file_path)

# Print the contents
print(mat_contents["X"].shape)
for i in range(20):
    plt.subplot(4,5,i+1)
    plt.imshow(mat_contents["X"][:,:,random.randint(0,224)], cmap='hot', interpolation='nearest')
    plt.colorbar()  # Add a colorbar to show the scale
plt.show()

