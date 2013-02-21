# Sass files are compiled in the target/minified-output folder, the paths below are relative to the individual theme directories inside there
$common_path = "../../common" # Location of owf's stylesheets and images that are common to mutiple themes
$image_path = "../images"  # Path to the images directory in this theme
$lib_path = "../../../../../../target/minified-output/libs" # Location of stylesheets and images belonging to external libraries

# sass_path: the directory your Sass files are in. THIS file should also be in the Sass folder
sass_path = File.dirname(__FILE__)

# css_path: the directory you want your CSS files to be.
# Generally this is a folder in the parent directory of your Sass files
css_path = File.join(sass_path, "..", "css")

# images_dir: Explicitly set to an empty string for proper functioning of theme_image() in lib/owf_utils.rb
images_dir = ""

# fonts_dir
relative_assets = true
fonts_dir = "../../../libs/fonts"

# output_style: The output style for your compiled CSS, can be nested, expanded, compact, compressed
# More information can be found here http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#output_style
output_style = :expanded

# We need to load the OWF Common Stylesheets
load File.join(File.dirname(__FILE__), $common_path)

# Load common directory from other required projects, such as Dashboard
load File.join(File.dirname(__FILE__), "../../../../../../target/minified-output/themes/common")

# Extract this theme's directory name
theme_dir = File.basename(File.expand_path('..'))
# Load this theme's corresponding directory from other required projects
load File.join(File.dirname(__FILE__), "../../../../../../target/minified-output/themes/" + theme_dir)

# Load in the sass content from external libraries (e.g. Twitter Bootstrap)
load File.join(File.dirname(__FILE__), $lib_path)