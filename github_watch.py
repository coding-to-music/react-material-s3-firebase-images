from asyncio import subprocess
import os
import time
import subprocess

import signal

TIME_DELAY = 10

# run the server for the first time
p = subprocess.Popen(["npm", "run", "dev"])
while True:
    git_changes = subprocess.check_output(["git", "pull"]).decode('utf-8')
    # checks if the pull had any changes
    if "Already up to date." in git_changes:
        print("Already up to date. No install necessary")
    else:
        print("Updated. Installing dependencies and starting nodemon...")
        # kills all running node processes
        subprocess.call(["killall", "-9", "node"])
        # restarts the node process
        subprocess.Popen(["npm", "run", "dev"])
    time.sleep(TIME_DELAY)