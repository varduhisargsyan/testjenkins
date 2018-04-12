# Sample AEM project template

This is a project template for AEM-based applications. It is intended as a best-practice set of examples as well as a potential starting point to develop your own functionality.

## Modules

The main parts of the template are:

* core: Java bundle containing all core functionality like OSGi services, listeners or schedulers, as well as component-related Java code such as servlets or request filters.
* ui.apps: contains the /apps (and /etc) parts of the project, ie JS&CSS clientlibs, components, templates, runmode specific configs as well as Hobbes-tests
* ui.content: contains sample content using the components from the ui.apps
* ui.tests: Java bundle containing JUnit tests that are executed server-side. This bundle is not to be deployed onto production.
* ui.launcher: contains glue code that deploys the ui.tests bundle (and dependent bundles) to the server and triggers the remote JUnit execution

## How to build

To build all the modules run in the project root directory the following command with Maven 3:

    mvn clean install

If you have a running AEM instance you can build and package the whole project and deploy into AEM with  

    mvn clean install -PautoInstallPackage
    
Or to deploy it to a publish instance, run

    mvn clean install -PautoInstallPackagePublish
    
Or to deploy only the bundle to the author, run

    mvn clean install -PautoInstallBundle

## Testing

There are three levels of testing contained in the project:

* unit test in core: this show-cases classic unit testing of the code contained in the bundle. To test, execute:

    mvn clean test

* server-side integration tests: this allows to run unit-like tests in the AEM-environment, ie on the AEM server. To test, execute:

    mvn clean integration-test -PintegrationTests

* client-side Hobbes.js tests: JavaScript-based browser-side tests that verify browser-side behavior. To test:

    in the browser, open the page in 'Developer mode', open the left panel and switch to the 'Tests' tab and find the generated 'MyName Tests' and run them.


## Maven settings

The project comes with the auto-public repository configured. To setup the repository in your Maven settings, refer to:

    http://helpx.adobe.com/experience-manager/kb/SetUpTheAdobeMavenRepository.html

## Adding fonts 

    https://docs.adobe.com/docs/en/aem/6-2/develop/platform/adding-fonts.html
1. Go to     
http://localhost:4502/system/console/configMgr
2.   Find "Day Commons GFX Font helper"
3. Add font path "/apps/gotomarket/fonts" and save (Return to CRXDE Lite. You should now see a .fontlist node in your folder containing the name of the imported fonts. )
     
## Naming Conventions      
     
     http://adobe-consulting-services.github.io/aemcasts/qr.html
     
## Install acs-aem-commons to AEM
    https://repo.adobe.com/nexus/content/repositories/public/com/adobe/acs/acs-aem-commons-content/3.9.0/
    https://mvnrepository.com/artifact/com.adobe.acs/acs-aem-commons-bundle/3.9.0
    https://mvnrepository.com/artifact/commons-validator/commons-validator/1.6
    https://mvnrepository.com/artifact/commons-beanutils/commons-beanutils/1.9.3
    https://mvnrepository.com/artifact/commons-digester/commons-digester/2.1
## Twitter4J    
    https://github.com/Adobe-Consulting-Services/com.adobe.acs.bundles.twitter4j/releases/download/com.adobe.acs.bundles.twitter4j-1.0.0/com.adobe.acs.bundles.twitter4j-content-1.0.0.zip
    
## Sling Main Servlet Config
    http://localhost:4502/system/console/configMgr
    Sling Main Servlet - Number of calls per request 2000    
    
## Sling resource resolver config /etc/map
http://localhost:4502/system/console/configMgr --	Apache Sling Resource Resolver Factory

## Test URl Mapping 
Sling -> Resource Resolver

## Apache Sling Dynamic Include
http://localhost:4503/system/console/bundles -- Apache Sling Dynamic Include

## Apache Sling Dynamic Include publish
http://localhost:4503/system/console/configMgr -- Apache Sling Dynamic Include

## On a publish instance WCM Mode must be set to DISABLED to ensure that no other mode is accessible
http://localhost:4503/system/console/configMgr
Day CQ WCM Filter - WCM Mode Disabled


## On a author instance WCM Mode must be set to EDIT to ensure that no other mode is accessible
http://localhost:4502/system/console/configMgr
Day CQ WCM Filter - WCM Mode Disabled

## Email and password is used to create google map key (current key's project name - go2market)
noreply.goto2market@gmail.com
Go2Market0
#SoM glyphicons are generated using 
https://icomoon.io/app/#/select/font

to add new glyphicons to existing css import 
etc\designs\gotomarket\clientlib-site\libs\selection.json selection.json use onone tool create project import selection.json