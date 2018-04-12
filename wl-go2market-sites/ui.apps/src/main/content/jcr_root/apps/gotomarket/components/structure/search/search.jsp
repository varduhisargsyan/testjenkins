<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Copyright 1997-2008 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Search component

  Draws the search form and evaluates a query

--%>
<%@include file="/libs/foundation/global.jsp" %>
<%
%>
<%@page session="false" %>
<%@ page import="java.text.NumberFormat,
                 org.apache.commons.lang.ArrayUtils,
                 com.day.cq.i18n.I18n,
                 com.day.cq.tagging.TagManager,
                 com.day.cq.wcm.foundation.Search" %>
<%@ page import="javax.jcr.RepositoryException" %>
<%
%>
<cq:setContentBundle source="page"/>
<%
    Search search = new Search(slingRequest);
    I18n i18n = new I18n(slingRequest);
//    String searchIn="/content/gotomarket/en";
    String searchIn = (String) properties.get("searchIn");
    final String[] nodeTypes = properties.get("nodeTypes", String[].class);
    String requestSearchPath = request.getParameter("path");
    if (searchIn != null) {
        // only allow the "path" request parameter to be used if it
        // is within the searchIn path configured
        if (requestSearchPath != null && requestSearchPath.startsWith(searchIn)) {

            search.setSearchIn(requestSearchPath);
        } else {

            search.setSearchIn(searchIn);
        }
    } else if (requestSearchPath != null) {

        search.setSearchIn(requestSearchPath);
    }
    final String escapedQuery = xssAPI.encodeForHTML(search.getQuery());
    final String escapedQueryForAttr = xssAPI.encodeForHTMLAttr(search.getQuery());
    final String escapedQueryForHref = xssAPI.getValidHref(search.getQuery());
    boolean isSearchFormHidden = false;

    request.setAttribute("escapedQuery", escapedQuery);
    request.setAttribute("escapedQueryForAttr", escapedQueryForAttr);
    request.setAttribute("escapedQueryForHref", escapedQueryForHref);
    pageContext.setAttribute("search", search);

    Search.Result result = null;
    try {
        result = search.getResult();
    } catch (RepositoryException e) {
        log.error("Unable to get search results", e);
    }

    if (result != null) {
        isSearchFormHidden = true;
    }
    request.setAttribute("isSearchFormHidden", isSearchFormHidden);

    request.setAttribute("result", result);

    String nextText = properties.get("nextText", i18n.get("Next", "Next page"));
    String noResultsText = properties.get("noResultsText", i18n.get("Your search - <b>{0}</b> - did not match any documents.", null, escapedQuery));
    String previousText = properties.get("previousText", i18n.get("Previous", "Previous page"));
    String searchButtonText = properties.get("searchButtonText", i18n.get("Search", "Search button text"));
    String resultPage = properties.get("resultPage", "/content/gotomarket/en/search");


    request.setAttribute("nextText", nextText);
    request.setAttribute("noResultsText", noResultsText);
    request.setAttribute("previousText", previousText);
    request.setAttribute("searchButtonText", searchButtonText);
    request.setAttribute("resultPage", resultPage);

    NumberFormat nf = NumberFormat.getNumberInstance(slingRequest.getLocale());

    pageContext.setAttribute("searchIn", searchIn);
%>
<c:set var="result" value="${result}"/>
<%
%>
<center>
    <form class="search--form" action="${currentPage.path}.html">
        <input class="search--input" type="text" placeholder="Search" name="q" value="${escapedQueryForAttr}"/>
        <input type="hidden" id="isSearchFormHidden" value="${isSearchFormHidden}"/><%
        if (ArrayUtils.isNotEmpty(nodeTypes)) {
            for (String type : nodeTypes) {
    %>  <input type="hidden" name="nodeType" value="<%= xssAPI.encodeForHTMLAttr(type) %>"/>
        <input type="hidden" id="resourcePath" value="${currentPage.getPath}"/>

        <%
            }
        }
    %> <input class="search--input-button" value="<%= xssAPI.encodeForHTMLAttr(searchButtonText) %>" type="submit"/>
    </form>
</center>
<section>
    <div class="grid-row grid">
        <div class="grid-col-12">
            <c:choose>
                <c:when test="${empty result && empty escapedQuery}">
                </c:when>
                <c:when test="${empty result.hits}">
                    ${result.trackerScript}
                    <%= xssAPI.filterHTML(noResultsText) %>
                    <span data-tracking="{event:'noresults', values:{'keyword': '<c:out value="${escapedQuery}"/>', 'results':'zero', 'executionTime':'${result.executionTime}'}, componentPath:'<%=resource.getResourceType()%>'}"></span>
                </c:when>
                <c:otherwise>
                    <h3><span
                            data-tracking="{event:'search', values:{'keyword': '<c:out value="${escapedQuery}"/>', 'results':'${result.totalMatches}', 'executionTime':'${result.executionTime}'}, componentPath:'<%=resource.getResourceType()%>'}"></span>
                    </h3>
                    ${result.trackerScript}
                    <%= xssAPI.filterHTML(properties.get("statisticsText", i18n.get("Results {0} - {1} of {2} for <b>{3}</b> ({4} seconds)", "Search query information", result.getStartIndex() + 1, result.getStartIndex() + result.getHits().size(), result.getTotalMatches(), escapedQuery, nf.format(Double.parseDouble(result.getExecutionTime()))))) %>

                    <br/>
                    <c:forEach var="hit" items="${result.hits}" varStatus="status">
                        <br/>
                        <c:if test="${hit.extension != \"\" && hit.extension != \"html\"}">
                            <span class="icon type_${hit.extension}"><img src="/etc/designs/default/0.gif"
                                                                          alt="*"></span>
                        </c:if>
                        <h3>
                            <a href="${hit.URL}"
                               onclick="trackSelectedResult(this, ${status.index + 1})">${hit.title}</a>
                        </h3>
                        <div>${hit.excerpt}</div>
                        <c:if test="${!empty hit.properties['cq:lastModified']}"> - <c:catch><fmt:formatDate
                                value="${hit.properties['cq:lastModified'].time}"
                                dateStyle="medium"/></c:catch></c:if> </a>
                        <br/>
                    </c:forEach>
                    <br/>
                    <c:if test="${fn:length(result.resultPages) > 1}">
                        <%--<%= xssAPI.encodeForHTML(resultPagesText) %>--%>
                        <c:if test="${result.previousPage != null}">
                            <a href="${result.previousPage.URL}"><%= xssAPI.encodeForHTML(previousText) %>
                            </a>
                        </c:if>
                        <c:forEach var="page" items="${result.resultPages}">
                            <c:choose>
                                <c:when test="${page.currentPage}">${page.index + 1}</c:when>
                                <c:otherwise>
                                    <a href="${page.URL}">${page.index + 1}</a>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                        <c:if test="${result.nextPage != null}">
                            <a href="${result.nextPage.URL}"><%= xssAPI.encodeForHTML(nextText) %>
                            </a>
                        </c:if>
                    </c:if>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
</section>