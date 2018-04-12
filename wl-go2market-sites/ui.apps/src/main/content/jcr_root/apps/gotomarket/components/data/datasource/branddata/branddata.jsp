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

    ValueMap vm_blank = new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_blank.put("value", "");
    vm_blank.put("text", "");

//Add 5 values to drop down!
    ValueMap vm_wl = new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_wl.put("value", "worldline");
    vm_wl.put("text", "Worldline");


    ValueMap vm_eq= new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_eq.put("value", "equensWorldline");
    vm_eq.put("text", "equensWorldline");


    //allocate memory to the Map instance
    ValueMap vm_at = new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_at.put("value", "atos");
    vm_at.put("text", "Atos");

    //allocate memory to the Map instance
    ValueMap vm_st = new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_at.put("value", "santeos");
    vm_at.put("text", "Santeos");

    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_blank));
    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_wl));
    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_eq));
    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_at));
    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_st));
//Create a DataSource that is used to populate the drop-down control
    DataSource ds = new SimpleDataSource(fakeResourceList.iterator());
    request.setAttribute(DataSource.class.getName(), ds);

%>