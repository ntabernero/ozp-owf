Ozone Widget Framework [![Build Status](https://travis-ci.org/ntabernero/ozp-owf.png?branch=master)](https://travis-ci.org/ntabernero/ozp-owf)
======================

This is the OWF module of the Ozone Platform.  It builds OSGI bundles that are meant to be run in the 
Ozone kernel.  It is a sub-module of the ozoneplatform project.  The easiest way to build and work with this
is to get the entire ozoneplatform project, https://github.com/ozoneplatform/ozoneplatform.git, and follow
that project's README.md for building and running the system.

If you have a specific need and you understand the technical ramifications, you can build just this sub-module.
* Install all the prerequisites mentioned in the ozoneplatform project's README.md.
* Run `mvn clean install`
* Manually copy the OSGI bundles created into an existing Ozone kernel instance's deploy directory
