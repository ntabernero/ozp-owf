$common_theme_path = "../../common" #location of owf theme stylesheets
$image_path = "../images"  #needed for images to render correctly

# include the utils rb file which has extra functionality for the ext theme
#compass_init_dir = "../../js-lib/ext-4.0.2a/resources/"
#require File.join(compass_init_dir, 'themes', 'compass_init.rb')

# sass_path: the directory your Sass files are in. THIS file should also be in the Sass folder
# Generally this will be in a resources/sass folder
# <root>/resources/sass
sass_path = File.dirname(__FILE__)

# css_path: the directory you want your CSS files to be.
# Generally this is a folder in the parent directory of your Sass files
# <root>/resources/css
css_path = File.join(sass_path, "..", "css")

# output_style: The output style for your compiled CSS
# nested, expanded, compact, compressed
# More information can be found here http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#output_style
output_style = :expanded

#We need to load the OWF Common Stylesheets
load File.join(File.dirname(__FILE__), $common_theme_path)
