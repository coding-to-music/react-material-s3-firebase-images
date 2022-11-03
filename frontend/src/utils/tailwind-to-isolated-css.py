# The purpose of this script is to dynamically output a CSS that applies to an isolated component.
# If there are changes, Tailwind re-renders the output CSS.
# Then, it is converted to SCSS and the wrapping class is added to the file.
# Sass then processes the new SCSS file and outputs a CSS where the styling is only defined for the wrapping class.

import time
import os

# Asks the user about the name of the React component's style wrapping class.
# By convention, the wrapping class's name is the component's name.
wrapping_class = input("Name of Wrapping CSS Class: ")

# Gets the path of the JS component based on the wrapping class's name.
component_path = "src/components/" + wrapping_class + ".js"
old_component_code = ""

def update_output_css():
    # Outputs an intermediary CSS class based on the manual CSS, and based on the tailwind classes read in components.
    os.system("npx tailwindcss -i src/tailwind/manual.css -o src/intermediary.css")

    # Copies the new, tailwind-generated CSS files into a SCSS file.
    os.system("cp src/intermediary.css src/intermediary.scss")

    # Reads the content of the new SCSS file.
    with open("src/intermediary.scss", "r") as f:
        plain_scss = f.read()

    new_scss = "#" + wrapping_class + "{" + plain_scss + "}"
    # Appends wrapping class to end of existing scss file
    with open("src/output.scss", "a") as f:
        f.write(new_scss);

    # Compiles the new, modified SCSS file with Sass into a CSS file.
    os.system("sass src/output.scss:src/output.css")
    print("Output CSS updated")

# Infinite loop used for watching the component code for changes.
while True:
    with open(component_path, "r") as f:
        componentCode = f.read()
    if componentCode != old_component_code:
        update_output_css()
        old_component_code = componentCode
    time.sleep(0.1)