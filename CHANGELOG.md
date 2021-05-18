# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## v0.0.0

* Support for escaped pseudo-class selector `.escaped\:hover`
* Support for nested pseudo-class `section div:hover h1`
* Support for multiple pseudo-class `div:hover, form input:focus`

* Known limitation with mixed pseudo-class :
  
```css 
div:hover a:active
/* should produce */
.trigger\:hover.trigger\:active div a 
```
