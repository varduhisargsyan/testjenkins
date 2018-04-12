<%@page session="false" import="
                  com.adobe.granite.ui.components.ds.DataSource,
                                com.adobe.granite.ui.components.ds.EmptyDataSource,
                                com.adobe.granite.ui.components.ds.SimpleDataSource,
                                com.adobe.granite.ui.components.ds.ValueMapResource,
                                org.apache.sling.api.resource.Resource,
                                org.apache.sling.api.resource.ResourceMetadata,
                                org.apache.sling.api.resource.ResourceResolver,
                                org.apache.sling.api.resource.ValueMap,
                                org.apache.sling.api.wrappers.ValueMapDecorator,
                                java.util.ArrayList,
                                java.util.HashMap,
                                java.util.List" %>
<%
%>
<%@taglib prefix="cq" uri="http://www.day.com/taglibs/cq/1.0" %>
<%
%><cq:defineObjects/><%

    // set fallback
    request.setAttribute(DataSource.class.getName(), EmptyDataSource.instance());
    ResourceResolver resolver = resource.getResourceResolver();
//Create an ArrayList to hold data
    List<Resource> fakeResourceList = new ArrayList<Resource>();

//Add 5 values to drop down!


    //allocate memory to the Map instance
    ValueMap vm_fb = new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_fb.put("value", "facebook");
    vm_fb.put("text", "Facebook");


    ValueMap vm_tw = new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_tw.put("value", "twitter");
    vm_tw.put("text", "Twitter");

    ValueMap vm_ln = new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_ln.put("value", "linkedin");
    vm_ln.put("text", "LinkedIn");

    ValueMap vm_ytb = new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_ytb.put("value", "youtube-play");
    vm_ytb.put("text", "YouTube");

    ValueMap vm_bg = new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_bg.put("value", "blog");
    vm_bg.put("text", "Blog");


    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_fb));
    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_tw));
    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_ln));
    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_ytb));
    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_bg));
//Create a DataSource that is used to populate the drop-down control
    DataSource ds = new SimpleDataSource(fakeResourceList.iterator());
    request.setAttribute(DataSource.class.getName(), ds);


%>