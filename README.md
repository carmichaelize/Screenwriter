##Features

Screenwriter removes the default Wordpress text editor and replaces it with its own extended solution. It allows you to manually create different text sections for each post, with each section comprising of an individual title input and WYSIWG editor.

It's the perfect solution to split, structure, organise post content. For complex theme layouts this is a great alternative to putting HTML directly into WYSIWYG editors. Key layout markup can be handled in the template files, while different sections are created to handle the content for these sections and context of how it's to be displayed.

Screenwriter is developer friendly and can be integrated into a theme in a variety of ways. It's more powerful features are flexible enough to allow for a range of possibilities and customisation to fit a project's needs.

Features include the ability too:

* Specify the number of sections to be created.
* Label inputs.
* Automatically display Screenwriter data on each posts.

A documented API is also provided for further theme integration, development and configuration, including the ability too:

* Get the Screenwriter data object for the current post, page or custom post type.
* Output the Screenwriter data as HTML.
* Specify the outputted HTML with a custom style array.
* Create multiple Screenwriter instances with individual admin configurations.
* Specify what post types to be displayed on.

Like the default WordPress WYSIWYG editor, Screenwriter uses the [TinyMCE](http://www.tinymce.com/) WYSIWYG editor, so offers similar functionality and look to the standard editor it replaces.

![Screenwriter](https://raw.githubusercontent.com/carmichaelize/Screenwriter/master/screenshot.jpg)

##Installation

To start using Screenwriter you must have a working version of WordPress (with an activated theme) already installed. To install the Screenwriter plugin:

1. Upload the Screenwriter folder to the plugin directory(/wp-content/plugins) on your server via FTP or use the WordPress plugin installer.
2. Activate the plugin by clicking "Activate".
3. In your themes functions.php file you need to create a new Screenwriter instance, see the Screenwriter_admin() documentation for further instructions.
4. Start using Screenwriter by editing posts, pages or custom post types and entering your content.

For more information on installing and managing WordPress plugins see the [WordPress Codex](http://codex.wordpress.org/Managing_Plugins](http://codex.wordpress.org/Managing_Plugins).

##Documentation

Screenwriter is built with developers in mind and provides a number of ways to integrate the plugin into a WordPress theme.

* screenwriter() – This function will output Screenwriter data as HTML with the ability to pass a styling array.
* get_screenwriter() – This function will return the Screenwriter data object, giving developers plenty of scope for further development.
* Screenwriter Admin Class – Multiple Screenwriter instances can be created manually using the screenwriter_admin() class. This allows for more than one instance to be installed (with different configuration options).

For more information check out the [plugin website](http://www.carmichaelize.co.uk/projects/screenwriter/). Screenwriter uses the [TinyMCE](http://www.tinymce.com/) WYSIWYG editor. For further editor configurations please consult the TinyMCE plugin [documentation](http://www.tinymce.com/).

##Documentation – screenwriter()

This function will output Screenwriter data as HTML.

###Usage

    screenwriter( $id, $params, $key );

###Parameters

**$id** *(integer)* *(optional)*
The ID of the post from which you want to return data. Use the get_the_id() function or global $post object ID (eg $post->ID) to get the value dynamically.

Default: *none*

**$params** *(array)* *(optional)*
An array of specified styling and markup parameters to be used when outputted as HTML. This provides a styling framework, however this may prove restrictive during advanced development. It might be more appropriate to output the data manually using the get_screenwriter() function. The styling options are:

* before – HTML before the item, typically an opening tag. Defaults to *"&lt;section&gt;"*.
* after – HTML after the item, typically a closing tag. Defaults to *"&lt;/section&gt;"*.
* before_title – HYML before the item title, typically an opening tag. Defaults to *"&lt;h1&gt;"*.
* after_title – HTML after the item title, typically a closing tag. Defaults to *"&lt;/h1&gt;"*.

Default: *array()*

**$key** *(string)* *(optional)*
A string value specifying the unique key used to save data to the WordPress post_meta table. A unique key is required to separate data from different Screenwriter instances, preventing possible conflicts.

Default: *"sc_screenwriter"*

###Examples

Output Screenwriter HTML for current post.

    <?php screenwriter(); ?>

Output Screenwriter HTML for the post with the id of 5.

    <?php screenwriter(5); ?>

###Notes

* A content filter is also in place that will override(unless specified) any saved post_content with Screenwriter data. This will be rendered using the default styling options outlined above in the **$params** array.

##Documentation – get_screenwriter()

This function will return a Screenwriter data object.

###Usage

    $screenwriter = get_screenwriter( $id, $key );

###Parameters

**$id** *(integer)* *(optional)*
The ID of the post from which you want to return data. Use the get_the_id() function or global $post object ID (eg $post->ID) to get the value dynamically.

Default: *none*

**$key** *(string)* *(optional)*
A string value specifying the unique key used to save data to the WordPress post_meta table. A unique key is required to separate data from different Screenwriter instances, preventing possible conflicts.

Default: *"sc_screenwriter"*

###Return Value

* If **$id** is left blank the function returns results for the current post, page or custom post type.
* If **$id** is specified, the function returns results for the specified post, page or custom post type.
* If **$key** is specified, the function returns results from that Screenwriter instance.

###Examples

Get the Screenwriter data object for current post.

    <?php $screenwriter = get_screenwriter(); ?>

Get the Screenwriter data object for the post with the id of 5.

    <?php $screenwriter = get_screenwriter(5); ?>

###Notes

* Values can also be accessed manually using WordPress's get_post_meta() function and passing *"sc_screenwriter"* (or a custom key value) as the specified key.

##Documentation – Admin Class

Screenwriter instances can be created manually using the Screenwriter_admin() class. This allows for multiple instances to be configured individually (with different options) per post type.

###Usage

    new Screenwriter_admin( $params, $key );

###Parameters

**$params** *(array)* *(optional)*
An array of specified configuration values for the Screenwriter instance. This provides a framework for how the instance should behave. The configuration options are:

* **post_types** – an array of post types to be displayed on. Defaults to array("post").
* **title** – a string to display as the metabox title. Defaults to "Page Content".
* **priority** – priority level of the metabox (default, core, high, low). Defaults to "default".
* **context** – position of the metabox (normal, side, advanced). Defaults to "side".
* **sections** – an array of configuration arrays (key and label), outlining section structure. Defaults to array("post").

Default: *array()*

**$key** *(string)* *(optional)*
A string value specifying the unique key used to save data to the WordPress post_meta table. A unique key is required to separate data from different Screenwriter instances, preventing possible conflicts.

Default: *"sc_screenwriter"*

###Examples

Customise the default Screenwriter instance to display two content sections.

    <?php
        $args = array(
            'editors' => array(
                array(
                    'key' => 'top_section',
                    'label' => 'Top Section'
                ),
                array(
                    'key' => 'bottom_section',
                    'label' => 'Bottom Section'
                )
            )
        );

        new Screenwriter_admin( $args );
    ?>

###Notes

* If a unique **$key** is not supplied the Screenwriter admin class will override the initial plugin instance with any new configuration set in the **$params** array.
* Due to some conflicts with the TinyMCE plugin it is not possible to display the default WordPress editor on pages where Screenwriter is in use.

##Licence

(Dual) [GPL](http://www.gnu.org/licenses/gpl.html) & [MIT](http://opensource.org/licenses/MIT)

