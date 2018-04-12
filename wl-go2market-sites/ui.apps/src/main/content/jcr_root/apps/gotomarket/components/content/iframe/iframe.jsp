<%--
  
  ==============================================================================

 An iFrame is a component that can be added to a page to show the contents of another site. 

--%><%@include file="/libs/foundation/global.jsp"%><%@page import="com.day.cq.dam.commons.util.DamUtil"%><%

String frameborder = properties.get("frameborder")!=null ? (String)properties.get("frameborder"):"1";
String height = properties.get("height")!=null ? (String)properties.get("height"):"100";
String width = properties.get("width")!=null ? (String)properties.get("width"):"100";
String name = properties.get("name")!=null ? (String)properties.get("name"):"";
String scrolling = properties.get("scrolling")!=null? (String)properties.get("scrolling"):"auto";
String srcurl = properties.get("sourceurl")!=null? (String)properties.get("sourceurl"):"#";
String title = properties.get("title")!=null? (String)properties.get("title"):currentPage.getTitle();
%><%
     Resource res = slingRequest.getResourceResolver().getResource(srcurl);
     if(res != null){
        String path =""; 
        if(DamUtil.isAsset(res)){
            path = res.getPath();
                                       
        }else{
            path = res.getPath()+".html";
            
        }
     %><iframe title="<%=title %>" src="<%=path%>" frameborder="<%=frameborder %>" name="<%=name%>" height="<%=height %>" width="<%=width %>" scrolling="<%=scrolling %>"></iframe><%
     }else{
     %><iframe title="<%=title %>" src="<%=srcurl%>" frameborder="<%=frameborder %>" name="<%=name%>" height="<%=height %>" width="<%=width %>" scrolling="<%=scrolling %>"></iframe><%
     }
%>
