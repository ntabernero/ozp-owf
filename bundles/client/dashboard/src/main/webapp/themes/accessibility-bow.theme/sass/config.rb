# sass files are compiled in the target/minified-output folder, the paths below are relative to the individual theme directories inside there
$common_path = "../../common" # location of owf's stylesheets and images that are common to mutiple themes
$image_path = "../images"  # path to the images directory in this theme
$lib_path = "../../../libs" # location of stylesheets and images belonging to external libraries

# if lib path doesn't exist we're running from src, set to go into target
unless File.exists?($lib_path)
    $lib_path = "../../../../../../target/minified-output/libs" #location of stylesheets and images belonging to external libraries
end

# sass_path: the directory your Sass files are in. THIS file should also be in the Sass folder
sass_path = File.dirname(__FILE__)

# css_path: the directory you want your CSS files to be.
# Generally this is a folder in the parent directory of your Sass files
css_path = File.join(sass_path, "..", "css")

# images_dir: Explicitly set to an empty string for proper functioning of theme_image() in lib/owf_utils.rb
images_dir = ""

# fonts_dir
relative_assets=true
fonts_dir = "../../../libs/fonts"

# if fonts dir doesn't exist we're running from src, set to go into target
unless File.exists?(fonts_dir)
    fonts_dir = "../../../../../../target/minified-output/libs/fonts" #location of stylesheets and images belonging to external libraries
end

# output_style: The output style for your compiled CSS
# nested, expanded, compact, compressed
# More information can be found here http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#output_style
output_style = :expanded

# We need to load the OWF Common Stylesheets
load File.join(File.dirname(__FILE__), $common_path)

# We need to load in the Twitter Bootstrap themes folder, which includes all it's default styling, images, variables and mixins
load File.join(File.dirname(__FILE__), $lib_path)