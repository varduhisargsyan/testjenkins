<%@page session="false" %><%--
  Copyright 1997-2008 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and isHiddenrietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Text component

  Draws text. If it's not rich text it is formatted beforehand.

--%>
<%@ page import="org.apache.jackrabbit.util.Text,
                 com.day.cq.wcm.foundation.Sitemap,
                 com.day.cq.wcm.api.PageFilter,
                 com.day.cq.wcm.api.PageManager" %>
<%@ page import="java.util.LinkedList" %>
<%@ page import="com.day.cq.wcm.api.Page" %>
<%@ page import="com.worldline.core.models.util.PagePropertyUtil" %>
<%@ page import="com.worldline.core.models.util.PropertyKey" %>
<%--<link rel="stylesheet" href="<%=request.getContextPath()%>/etc/designs/gotomarket/clientlib-site/custom.css" TYPE="text/css">--%>
<%
%>
<%@include file="/libs/foundation/global.jsp" %>
<%

    String rootPath = properties.get("rootPath", "");
    if (rootPath.length() > 0) {
        if (rootPath.startsWith("path:")) {
            rootPath = rootPath.substring(5, rootPath.length());
        }
    } else {
        long absParent = currentStyle.get("absParent", 2L);
        rootPath = currentPage.getAbsoluteParent((int) absParent).getPath();
    }


%>
<div class="text"><%
    Page rootPage = slingRequest.getResourceResolver().adaptTo(PageManager.class).getPage(rootPath);
    Sitemap stm = new Sitemap(rootPage);
    LinkedList<Sitemap.Link> links = stm.getLinks();
    response.getWriter().write("<div class=\"sitemap\">");
    PageManager pageMng = slingRequest.getResourceResolver().adaptTo(PageManager.class);

    for (Sitemap.Link aLink : links) {

        Page aPage = pageMng.getPage(aLink.getPath());
        final int level = aLink.getLevel();

        final boolean isHidden = PagePropertyUtil.initBooleanPropSelf(aPage, PropertyKey.PROP_KEY_HIDE_IN_NAV);

        if (!isHidden) {
            switch (level) {
                case 0:
                    break;
                case 1:
                    response.getWriter().write("<div class=\"sitemap-tr-border level1\"><a href=\"" + aLink.getPath() + "\">" + aLink.getTitle() + "</a></div>");
                    break;
                case 2:
                    response.getWriter().write("<div class=\"level2\"><li class=\"sitemap-li-style\"><a href=\"" + aLink.getPath() + "\">" + aLink.getTitle() + "</a></li></div>");
                    break;
                case 3:
                    response.getWriter().write("<div class=\"level3 \"><i class=\"right\"></i><a class=\"sitemap-link\" href=\"" + aLink.getPath() + "\">" + aLink.getTitle() + "</a></div>");
                    break;
                case 4:
                    response.getWriter().write("<div class=\"level4 \"><i class=\"right\"></i><a class=\"sitemap-link\" href=\"" + aLink.getPath() + "\">" + aLink.getTitle() + "</a></div>");
                    break;
                case 5:
                    response.getWriter().write("<div class=\"level5 \"><i class=\"right\"></i><a class=\"sitemap-link\" href=\"" + aLink.getPath() + "\">" + aLink.getTitle() + "</a></div>");
                    break;
                case 6:
                    response.getWriter().write("<div class=\"level6 \"><i class=\"right\"></i><a class=\"sitemap-link\" href=\"" + aLink.getPath() + "\">" + aLink.getTitle() + "</a></div>");
                    break;
                case 7:
                    response.getWriter().write("<div class=\"level7 \"><i class=\"right\"></i><a class=\"sitemap-link\" href=\"" + aLink.getPath() + "\">" + aLink.getTitle() + "</a></div>");
                    break;

                default:
                    response.getWriter().write("<div class=\"level-dflt \"><i class=\"right\"></i><a class=\"sitemap-link\" href=\"" + aLink.getPath() + "\">" + aLink.getTitle() + "</a></div>");
            }
        }
    }
    response.getWriter().write("</div>");
%>

</div>
