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
    ValueMap vm_i1 = new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_i1.put("value", "icon careers");
    vm_i1.put("text", "Careers");


    ValueMap vm_i2 = new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_i2.put("value", "icon investors");
    vm_i2.put("text", "Investors");

    ValueMap vm_i3 = new ValueMapDecorator(new HashMap<String, Object>());
    //populate the map
    vm_i3.put("value", "icon newsroom");
    vm_i3.put("text", "Newsroom");

    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_i1));
    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_i2));
    fakeResourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm_i3));

    //Create a DataSource that is used to populate the drop-down control
    DataSource ds = new SimpleDataSource(fakeResourceList.iterator());
    request.setAttribute(DataSource.class.getName(), ds);

%>