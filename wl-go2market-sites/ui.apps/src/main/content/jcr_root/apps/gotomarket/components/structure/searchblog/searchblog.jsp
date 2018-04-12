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

--%><%@include file="/libs/foundation/global.jsp" %><%
%><%@page session="false"%><%@ page import="java.text.NumberFormat,
                                          org.apache.commons.lang.ArrayUtils,
                                          com.day.cq.i18n.I18n,
                                          com.day.cq.tagging.TagManager,
                                          com.day.cq.wcm.foundation.Search" %>
<%@ page import="javax.jcr.RepositoryException" %>
<%
%>
<cq:setContentBundle source="page" />
<%
    Search search = new Search(slingRequest);
    I18n i18n = new I18n(slingRequest);
//    String searchIn="/content/gotomarket/en";
    String searchIn = (String) properties.get("searchIn");
    final String[] nodeTypes = properties.get("nodeTypes", String[].class);
    String requestSearchPath = request.getParameter("path");
    String attr="DEF ";
    if (searchIn != null) {
        attr="searchin !=null";
        // only allow the "path" request parameter to be used if it
        // is within the searchIn path configured
        if (requestSearchPath != null && requestSearchPath.startsWith(searchIn)) {
            attr="requestSearchPath  && requestSearchPath.startsWith(searchIn)";

            search.setSearchIn(requestSearchPath);
        } else {
            attr="requestSearchPath  && ! requestSearchPath.startsWith(searchIn)";

            search.setSearchIn(searchIn);
        }
    } else if (requestSearchPath != null) {
        attr="requestSearchPath  !=null ";

        search.setSearchIn(requestSearchPath);
    }
    request.setAttribute("ATTR", attr);
    final String escapedQuery = xssAPI.encodeForHTML(search.getQuery());
    final String escapedQueryForAttr = xssAPI.encodeForHTMLAttr(search.getQuery());
    final String escapedQueryForHref = xssAPI.getValidHref(search.getQuery());

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
    request.setAttribute("result", result);

    String nextText = properties.get("nextText", i18n.get("Next", "Next page"));
    String noResultsText = properties.get("noResultsText", i18n.get("Your search - <b>{0}</b> - did not match any documents.", null, escapedQuery));
    String previousText = properties.get("previousText", i18n.get("Previous", "Previous page"));
    String relatedSearchesText = properties.get("relatedSearchesText", i18n.get("Related searches:"));
    String resultPagesText = properties.get("resultPagesText", i18n.get("Results", "Search results"));
    String searchButtonText = properties.get("searchButtonText", i18n.get("Search", "Search button text"));
    String searchTrendsText = properties.get("searchTrendsText", i18n.get("Search Trends"));
    String similarPagesText = properties.get("similarPagesText", i18n.get("Similar Pages"));
    String spellcheckText = properties.get("spellcheckText", i18n.get("Did you mean:", "Spellcheck text if typo in search term"));
    String resultPage = properties.get("resultPage", "/content/gotomarket/en");


    request.setAttribute("nextText", nextText);
    request.setAttribute("noResultsText", noResultsText);
    request.setAttribute("previousText", previousText);
    request.setAttribute("relatedSearchesText", relatedSearchesText);
    request.setAttribute("resultPagesText", resultPagesText);
    request.setAttribute("searchButtonText", searchButtonText);
    request.setAttribute("searchTrendsText", searchTrendsText);
    request.setAttribute("similarPagesText", similarPagesText);
    request.setAttribute("spellcheckText", spellcheckText);
    request.setAttribute("resultPage", resultPage);

    NumberFormat nf = NumberFormat.getNumberInstance(slingRequest.getLocale());

    pageContext.setAttribute("searchIn", searchIn);
%>
<c:set var="trends" value="${search.trends}"/>
<c:set var="result" value="${result}"/>
<%
%>
 <div class="input-field">
     <form  action="${currentPage.path}.html">
         <label class="blog--search-label sr-only" for="search">Search</label>
         <input  type="text" id="search" placeholder="Search" name="q"
                value="${escapedQueryForAttr}"/>
         <%
             if (ArrayUtils.isNotEmpty(nodeTypes)) {
                 for (String type : nodeTypes) {
         %>
         <input type="hidden" name="nodeType" value="<%= xssAPI.encodeForHTMLAttr(type) %>"/><%
             }
         }
     %>
     </form>
 </div>
<section>
    <div class="grid-row grid">
        <div class="grid-col-12">
            <c:choose>
                <c:when test="${empty result && empty escapedQuery}">
                </c:when>
                <c:when test="${empty result.hits}">
                    ${result.trackerScript}
                    <c:if test="${result.spellcheck != null}">
                        <p><%= xssAPI.encodeForHTML(spellcheckText) %> <a
                                href="<c:url value="${currentPage.path}.html"><c:param name="q" value="${result.spellcheck}"/></c:url>"><b><c:out
                                value="${result.spellcheck}"/></b></a></p>
                    </c:if>
                    <%= xssAPI.filterHTML(noResultsText) %>
                    <span data-tracking="{event:'noresults', values:{'keyword': '<c:out value="${escapedQuery}"/>', 'results':'zero', 'executionTime':'${result.executionTime}'}, componentPath:'<%=resource.getResourceType()%>'}"></span>
                </c:when>
                <c:otherwise>
                    <h3><span data-tracking="{event:'search', values:{'keyword': '<c:out value="${escapedQuery}"/>', 'results':'${result.totalMatches}', 'executionTime':'${result.executionTime}'}, componentPath:'<%=resource.getResourceType()%>'}"></span></h3>
                    ${result.trackerScript}
                    <%= xssAPI.filterHTML(properties.get("statisticsText", i18n.get("Results {0} - {1} of {2} for <b>{3}</b> ({4} seconds)", "Search query information", result.getStartIndex() + 1, result.getStartIndex() + result.getHits().size(), result.getTotalMatches(), escapedQuery, nf.format(Double.parseDouble(result.getExecutionTime()))))) %>

                    <c:if test="${fn:length(search.relatedQueries) > 0}">
                        <br/><br/>
                        <%= xssAPI.encodeForHTML(relatedSearchesText) %>
                        <c:forEach var="rq" items="${search.relatedQueries}">
                            <a style="margin-right:10px" href="${currentPage.path}.html?q=${rq}"><c:out
                                    value="${rq}"/></a>
                        </c:forEach>
                    </c:if>
                    <br/>
                    <c:forEach var="hit" items="${result.hits}" varStatus="status">
                        <br/>
                        <c:if test="${hit.extension != \"\" && hit.extension != \"html\"}">
                            <span class="icon type_${hit.extension}"><img src="/etc/designs/default/0.gif"
                                                                          alt="*"></span>
                        </c:if>
                        <a href="${hit.URL}"
                           onclick="trackSelectedResult(this, ${status.index + 1})">${hit.title}</a>
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