package com.worldline.core.services;

import com.day.cq.commons.Externalizer;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.WCMMode;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.exceptions.PageNotFoundException;
import com.worldline.core.models.data.ArticleBriefItem;
import com.worldline.core.models.data.SocialIcon;
import com.worldline.core.models.util.FileFormatEnum;
import com.worldline.core.models.util.PagePropertyUtil;
import com.worldline.core.models.util.PageUtils;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.util.DateTimeUtil;
import com.worldline.core.util.ExceptionKeys;
import com.worldline.core.util.GlobalKeys;
import com.worldline.core.util.Validator;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.jcr.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@Service(value = JCRDataResolver.class)
@Component(/*metatype = true*/ immediate = true)
public class JCRDataResolverImpl implements JCRDataResolver {

    @Inject
    private Page currentPage;

    private String matches;

    @Reference
    private ResourceResolverFactory resolverFactory;
    @Reference
    private TagManagerService tagManagerService;
    @Reference
    private QueryBuilder builder;

    private static final Logger LOG = LoggerFactory.getLogger(JCRDataResolverImpl.class);
    private DateFormat format = new SimpleDateFormat("ddMMM.yyyy", Locale.ENGLISH);

    private static final String PROP_DATE = "@jcr:content/creationDate";
    private static final String PROP_TITLE = "@jcr:content/jcr:title";
    private static final String PROP_HIDEIN_NAV = "@jcr:content/hideInNav";
    private static final String PROP_LAST_REPLICATION_ACTION = "@jcr:content/cq:lastReplicationAction";
    private static final String PROP_LAST_REPLICATION_ACTION_VALUE = "Activate";
    private static final String PROP_CQ_PAGE = "cq:Page";
    private static final String PROP_DAM_ASSET = "dam:Asset";
    private static final String PROP_CONTENT_METADATA_DC_FORMAT = "@jcr:content/metadata/dc:format";

    private static final String PROP_KEY_CATEGORIES = "@jcr:content/categories";
    private static final String PROP_CQ_TAGS = "@jcr:content/cq:tags";
    private static final String PROP_CQ_CATEGORIES = "@jcr:content/categories";
    private static final String PROP_JCR_CONTENT = "jcr:content";
    private static final String PROP_JCR_TITLE = "jcr:title";
    private static final String PROP_JCR_DESCRIPTION = "jcr:description";
    private static final String PROP_CREATION_DATE = "creationDate";
    private static final String PROP_JCR_CREATED_BY = "jcr:createdBy";
    private static final String PROP_DAM_RELATIVE_PATH = "dam:relativePath";

    private static final String PROP_IMAGE_PATH = "imagePath";
    private static final String PROP_AUTHOR_IMAGE = "authorImage";
    private static final String PROP_AUTHOR_NAME = "authorName";
    private static final String PROP_CATEGORIES = "categories";
    private static final String PROP_JCR_CREATED = "jcr:created";
    private static final String PROP_ON_TIME = "jcr:onTime";
    private static final String PROP_SLING_RESOURCE_TYPE = "@jcr:content/sling:resourceType";

    private static final String GROUP_P_AND = "group.p.and";
    private static final String TYPE = "type";
    private static final String GROUP_1_PROPERTY = "group.1_property";
    private static final String GROUP_2_GROUP_PROPERTY = "group.2_group.property";
    private static final String GROUP_2_GROUP_PROPERTY_VALUE = "group.2_group.property.value";
    private static final String GROUP_2_GROUP_PROPERTY_OPERATION = "group.2_group.property.operation";
    private static final String DEFAULT_IMAGE_PATH = "/content/dam/gotomarket/uploads/bg-header-industries.jpg";

    private static final String GROUP_2_PROPERTY = "group.2_property";

    private static final String GROUP_2_PROPERTY_VALUE = "group.2_property.value";
    private static final String GROUP_2_PROPERTY_OPERATION = "group.2_property.operation";
    private static final String GROUP_3_PROPERTY = "group.3_property";
    private static final String GROUP_3_PROPERTY_VALUE = "group.3_property.value";
    private static final String GROUP_3_PROPERTY_OPERATION = "group.3_property.operation";
    private static final String GROUP_4_PROPERTY_OPERATION = "group.4_property.operation";
    private static final String GROUP_5_PROPERTY_OPERATION = "group.5_property.operation";
    private static final String GROUP_4_PROPERTY = "group.4_property";
    private static final String GROUP_4_PROPERTY_VALUE = "group.4_property.value";
    private static final String GROUP_5_PROPERTY = "group.5_property";
    private static final String GROUP_5_PROPERTY_VALUE = "group.5_property.value";
    private static final String GROUP_1_GROUP_1 = "1_group.1_group";
    private static final String GROUP_1_GROUP_1_P_OR = "1_group.1_group.p.or";
    private static final String GROUP_2_GROUP_1 = "2_group.1_group";
    private static final String GROUP_2_GROUP_1_TYPE = "2_group.1_group.type";
    private static final String GROUP_2_GROUP_1_PROPERTY_4 = "2_group.1_group.4_property";
    private static final String GROUP_2_GROUP_1_PROPERTY_4_VALUE = "2_group.1_group.4_property.value";
    private static final String GROUP_2_GROUP_1_PROPERTY_4_OPERATION = "2_group.1_group.4_property.operation";
    private static final String GROUP_2_GROUP_1_PROPERTY_1 = "2_group.1_group.1_property";
    private static final String GROUP_2_GROUP_1_PROPERTY_1_VALUE = "2_group.1_group.1_property.value";
    private static final String GROUP_2_GROUP_1_PROPERTY_1_OPERATION = "2_group.1_group.1_property.operation";
    private static final String GROUP_2_GROUP_1_PROPERTY_3_OPERATION = "2_group.1_group.3_property.operation";
    private static final String GROUP_2_GROUP_1_PROPERTY_2 = "2_group.1_group.2_property";
    private static final String GROUP_2_GROUP_1_PROPERTY_3 = "2_group.1_group.3_property";

    private static final String GROUP_2_GROUP_1_PROPERTY_3_VALUE = "2_group.1_group.3_property.value";

    private static final String GROUP_2_GROUP_1_PROPERTY_2_OR = "2_group.1_group.2_property.or";
    private static final String GROUP_2_GROUP_1_PROPERTY_3_OR = "2_group.1_group.3_property.or";
    private static final String GROUP_2_GROUP_1_P_AND = "2_group.1_group.p.and";
    private static final String GROUP_2_GROUP_1_ORDER_BY = "2_group.1_group.1_orderby";
    private static final String GROUP_2_GROUP_2_ORDER_BY = "2_group.2_group.2_orderby";
    private static final String GROUP_2_GROUP_2 = "2_group.2_group";
    private static final String GROUP_2_GROUP_2_TYPE = "2_group.2_group.type";
    private static final String GROUP_2_GROUP_2_PROPERTY_1 = "2_group.2_group.1_property";
    private static final String GROUP_2_GROUP_2_PROPERTY_2 = "2_group.2_group.2_property";
    private static final String GROUP_2_GROUP_2_PROPERTY_2_OPERATION = "2_group.2_group.2_property.operation";
    private static final String GROUP_2_GROUP_2_PROPERTY_2_VALUE = "2_group.2_group.2_property.value";
    private static final String GROUP_2_GROUP_2_PROPERTY_1_OR = "2_group.2_group.1_property.or";
    private static final String GROUP_2_GROUP_2_P_AND = "2_group.2_group.p.and";
    private static final String GROUP_2_P_OR = "2_group.p.or";
    private static final String WORKFLOW_PROCESS_SERVICE = "workflow-process-service";

    private static final String PROPERTY_2 = "2_property";
    private static final String PROPERTY_1 = "1_property";
    private static final String PROPERTY_3 = "3_property";

    private static final String BLOG_ARTICLE_TEMPLATE_PATH = "gotomarket/components/structure/pages/blogarticle";
    private static final String PRESS_RELEASE_ARTICLE_TEMPLATE_PATH = "gotomarket/components/structure/pages/releasearticle";
    private static final String DOT_HTML = ".html";
    private static final String TITLE = "title";
    private static final String ASCENDING = "asc";
    private static final String DAM_ASSET_CONTENT = "dam:AssetContent";
    private static final String JCR_PRIMARY_TYPE = "jcr:primaryType";
    private static final String PROP_DC_TITLE = "dc:title";
    private static final String PROP_PDF_TITLE = "pdf:title";
    private static final String METADATA = "metadata";
    private static final String G2M_TECH_USER = "g2m-tech-user";

    private static final String DOT = ".";
    private static final String VALUE = "value";
    private static final String PATH = "path";
    private static final String UNDERSCORE = "_";
    private static final String ORDER_BY = "orderby";
    private static final String ORDER_BY_SORT = "orderby.sort";
    private static final String P_LIMIT = "p.limit";
    private static final String UNEQUALS = "unequals";
    private static final String EQUALS = "equals";
    private static final String TRUE = "true";
    private static final String PROP_SORT_ASC = "acs";
    private static final String PROP_SORT_DESC = "desc";

    @Override
    public void deleteProperty(String propertyName, String startPath) {
        Session session = null;
        ResourceResolver resourceResolver = null;

        try {

            Map<String, Object> param = new HashMap<>();
            param.put(ResourceResolverFactory.USER, G2M_TECH_USER);
            resourceResolver = resolverFactory.getServiceResourceResolver(param);
            session = resourceResolver.adaptTo(Session.class);
            Map<String, String> map = new HashMap<>();
            map.put(TYPE, PROP_CQ_PAGE);
            // Start paths
            StringBuilder predicateWL = new StringBuilder();
            predicateWL.append(GROUP_1_GROUP_1).append(DOT).append(1).append(UNDERSCORE).append(PATH);
            map.put(predicateWL.toString(), "/content/worldline");

            StringBuilder predicateEWL = new StringBuilder();
            predicateEWL.append(GROUP_1_GROUP_1).append(DOT).append(2).append(UNDERSCORE).append(PATH);
            map.put(predicateEWL.toString(), "/content/equensworldline");

            StringBuilder predicateF = new StringBuilder();
            predicateF.append(GROUP_1_GROUP_1).append(DOT).append(3).append(UNDERSCORE).append(PATH);
            map.put(predicateF.toString(), "/content/worldline-fairs");

            map.put(GROUP_1_GROUP_1_P_OR, TRUE);

            map.put(P_LIMIT, "2000");
            Query query = builder.createQuery(PredicateGroup.create(map), session);

            SearchResult result = query.getResult();
            long totalMatches = result.getTotalMatches();
            LOG.info("Total matches " + totalMatches);
            LOG.info("query [ " + map.toString() + "]");

            this.matches = String.valueOf(totalMatches);

            for (Hit hit : result.getHits()) {
                try {
                    Node articlePage = hit.getNode().getNode(PROP_JCR_CONTENT);
                    articlePage.setProperty("noExtentionContactUs", (String) null);
                    articlePage.setProperty("noExtentionJoinUs", (String) null);
                    articlePage.setProperty("isExternalJoinUsUrl", (String) null);
                    articlePage.setProperty("isExternalContactUsUrl", (String) null);
                    LOG.info("PROPERTY REMOVED FROM PAGE ------> " + hit.getPath());
                    session.save();
                } catch (RepositoryException ex) {
                    LOG.warn(ex.toString());
                } catch (NullPointerException ex) {
                    LOG.info(ex.toString());
                }
            }
        } catch (Exception e) {
            LOG.info(ExceptionKeys.SOMETHING_WENT_WRONG_WITH_SESSION, e);
        } finally {

            session.logout();
        }

    }


    @Override
    public List<ArticleBriefItem> getPaginationData(String[] startPaths, String[] tags, String itemPerPage, String selector, String orderBy, String sort, SlingHttpServletRequest request) throws GenericException {
        ResourceResolver resourceResolver = null;
        Session session = null;
        List<ArticleBriefItem> resources = new ArrayList();
        if (Validator.isEmpty(startPaths)) {
            throw new GenericException("StartPath is required! Please fill it");
        }
        try {
            Map<String, Object> param = new HashMap<>();
            param.put(ResourceResolverFactory.USER, G2M_TECH_USER);
            resourceResolver = resolverFactory.getServiceResourceResolver(param);
            session = resourceResolver.adaptTo(Session.class);
            Map<String, String> map = new HashMap<>();
            // Start paths
            for (int i = 0; i < startPaths.length; i++) {
                StringBuilder predicate = new StringBuilder();
                predicate.append(GROUP_1_GROUP_1).append(DOT).append(i + 1).append(UNDERSCORE).append(PATH);
                map.put(predicate.toString(), startPaths[i]);

            }

            LOG.info("Mandatory inputs: startPath= " + Arrays.asList(startPaths));
            LOG.info("Mandatory inputs: page= " + selector);
            LOG.info("Mandatory inputs: orderBy= " + orderBy);
            LOG.info("Mandatory inputs: sort= " + sort);
            LOG.info("Mandatory inputs: itemPerPage= " + itemPerPage);


            map.put(GROUP_1_GROUP_1_P_OR, TRUE);
            //  type = cq page,
            map.put(GROUP_2_GROUP_1_TYPE, PROP_CQ_PAGE);

            map.put(GROUP_2_GROUP_1_PROPERTY_1, PROP_HIDEIN_NAV);
            map.put(GROUP_2_GROUP_1_PROPERTY_1_VALUE, TRUE);
            map.put(GROUP_2_GROUP_1_PROPERTY_1_OPERATION, UNEQUALS);


            if (!Validator.isEmpty(tags)) {
                map.put(GROUP_2_GROUP_1_PROPERTY_2, PROP_CQ_TAGS);
                //  "V1" or "V2" or "V3" or "V-n"
                for (int i = 0; i < tags.length; i++) {
                    StringBuilder propertyValue = new StringBuilder();
                    propertyValue.append(GROUP_2_GROUP_1).append(DOT).append(PROPERTY_2).append(DOT).append(i + 1).append(UNDERSCORE).append(VALUE);
                    map.put(propertyValue.toString(), tags[i]);
                }
                map.put(GROUP_2_GROUP_1_PROPERTY_2_OR, TRUE);
            }
            map.put(GROUP_2_GROUP_1_P_AND, TRUE);


            //   type = dam:Asset
            map.put(GROUP_2_GROUP_2_TYPE, PROP_DAM_ASSET);

            //To exclude some file formats
            map.put(GROUP_2_GROUP_2_PROPERTY_1, PROP_CONTENT_METADATA_DC_FORMAT);

            for (int i = 0; i < FileFormatEnum.values().length; i++) {
                StringBuilder propertyValue = new StringBuilder();
                propertyValue.append(GROUP_2_GROUP_2).append(DOT).append(PROPERTY_1).append(DOT).append(i + 1).append(UNDERSCORE).append(VALUE);
                map.put(propertyValue.toString(), FileFormatEnum.values()[i].getName());
            }

            //To exclude sub assets
            map.put(GROUP_2_GROUP_2_PROPERTY_2, PROP_JCR_CREATED_BY);
            map.put(GROUP_2_GROUP_2_PROPERTY_2_OPERATION, UNEQUALS);
            map.put(GROUP_2_GROUP_2_PROPERTY_2_VALUE, WORKFLOW_PROCESS_SERVICE);

            map.put(GROUP_2_GROUP_2_PROPERTY_1_OR, TRUE);
            map.put(GROUP_2_GROUP_2_P_AND, TRUE);
            map.put(GROUP_2_P_OR, TRUE);

            map.put(ORDER_BY, PROP_DATE);
            map.put(ORDER_BY_SORT, PROP_SORT_DESC);

            map.put(P_LIMIT, itemPerPage);

            if (resourceResolver != null && resourceResolver.isLive()) {
                LOG.info("ResourceREsolver is not null and alive ");
            } else {
                LOG.error("ResourceREsolver is null or is not alive");
            }
            if (session != null && session.isLive()) {
                LOG.info("Session is not  null and alive ");
            } else {
                LOG.error("Session is null or is not alive ");
            }
            // Create query
            Query query = builder.createQuery(PredicateGroup.create(map), session);
            query.setStart(Integer.valueOf(itemPerPage) * Integer.valueOf(selector));
            SearchResult result = query.getResult();

            LOG.info("Provided query string " + map.toString());

            long totalMatches = result.getTotalMatches();
            this.matches = String.valueOf(totalMatches);
            LOG.info("Total matches returned {original:" + totalMatches + " {, set: " + this.matches);

            for (Hit hit : result.getHits()) {
                try {
                    ArticleBriefItem item = new ArticleBriefItem();
                    Node node = hit.getNode().getNode(PROP_JCR_CONTENT);

                    if (node == null) {
                        LOG.warn("JCR content instance is null");
                        continue;
                    }

                    if (!WCMMode.EDIT.equals(WCMMode.fromRequest(request))) {
                        if (!isResourceActiveOnPublish(node, PropertyKey.PROP_KEY_ON_TIME) ||
                                !isResourceActiveOnPublish(node, PropertyKey.PROP_KEY_OFF_TIME)) {

                            LOG.warn("RESOURCE IS NOT ACTIVE ON PUBLISH " + node.getName());
                            continue;
                        }
                    }

                    Property type = node.getProperty(JCR_PRIMARY_TYPE);
                    if (DAM_ASSET_CONTENT.equals(type.getString())) {
                        //LOG.info("Resource type dam:asset" + node.getParent().getName());
                        Property title = getDamFileTitle(node);
                        Property date = hit.getNode().getProperty(PROP_JCR_CREATED);
                        item.setLink(hit.getPath());
                        item.setTitle(title.getString());
                        item.setExtension(getExtensionFromPath(node));
                        item.setDate(DateTimeUtil.getFormattedStringDate(date.getString()));
                    } else {
                        //LOG.info("Resource type cq:page " + node.getParent());
                        Property title = node.getProperty(PROP_JCR_TITLE);
                        Property date = getCreationDate(node);
                        String desc = getOptionalProperty(node, PROP_JCR_DESCRIPTION);
                        item.setLink(hit.getPath() + DOT_HTML);
                        item.setTitle(title.getString());
                        item.setText(desc);
                        item.setDate(DateTimeUtil.getFormattedStringDate(date.getString()));
                    }
                    resources.add(item);
                } catch (RepositoryException ex) {
                    StringBuilder exceptionMessage = new StringBuilder();
                    exceptionMessage.append(hit.getPath());
                    exceptionMessage.append(ex.getMessage());
                    LOG.warn(ExceptionKeys.INVALID_PAGE_FOUND + exceptionMessage.toString());
                }
            }
            sortResultList(resources, orderBy, sort);
        } catch (Exception e) {
            LOG.error(ExceptionKeys.SOMETHING_WENT_WRONG_WITH_SESSION + e);
        } finally {
            if (session != null && session.isLive()) {
                session.logout();
            }
            if (resourceResolver != null && resourceResolver.isLive()) {
                resourceResolver.close();
            }
        }
        return resources;
    }

    @Override
    public List<ArticleBriefItem> getBlogArticles(String startPath, String selector, String itemPerPage,
                                                  String category, String[] tags, String orderBy, String orderSort, SlingHttpServletRequest request, Locale locale) throws GenericException {

        LOG.info("Mandatory inputs: startPath= " + startPath);
        LOG.info("Mandatory inputs: page= " + selector);
        LOG.info("Mandatory inputs: orderBy= " + orderBy);
        LOG.info("Mandatory inputs: sort= " + category);
        LOG.info("Mandatory inputs: itemPerPage= " + itemPerPage);

        if (!Validator.isEmpty(tags)) {
            LOG.info(" tags " + Arrays.asList(tags));
        } else {
            LOG.info(" tags " + tags);
        }


        List<ArticleBriefItem> resources = new ArrayList();
        if (Validator.isEmpty(startPath)) {
            LOG.warn("StartPath is required! Please fill it");
            throw new GenericException("StartPath is null");

        }
        ResourceResolver resourceResolver = null;
        Session session = null;

        try {

            Map<String, Object> param = new HashMap<>();
            param.put(ResourceResolverFactory.USER, "g2m-tech-user");
            resourceResolver = resolverFactory.getServiceResourceResolver(param);
            LOG.info("ResourceResolver instance is successfully obtained from resolverFactory");
            session = resourceResolver.adaptTo(Session.class);


            Map<String, String> map = new HashMap<>();
            map.put(TYPE, PROP_CQ_PAGE);
            map.put(GROUP_P_AND, TRUE);
            map.put(PATH, startPath);

            if (!Validator.isEmpty(tags)) {
                map.put(GROUP_1_PROPERTY, PROP_CQ_TAGS);
        /*
           "V1" or "V2" or "V3" or "V-n"
        */
                for (int i = 0; i < tags.length; i++) {

                    StringBuilder propertyValue = new StringBuilder();
                    propertyValue.append(GROUP_1_PROPERTY).append(DOT).append(i + 1).append(UNDERSCORE).append(VALUE);
                    map.put(propertyValue.toString(), PropertyKey.BLOG_NAMESPACE + ":" + tags[i]);
                }
            }
            // map.put(GROUP_1_P_OR, "true");
            /*
            in case when tags are selected   category is set to undefined  and tags = selected tag(s)
             */
            if (!Validator.isEmpty(category)) {
                LOG.info("Category filter is set " + category);

                map.put(GROUP_2_PROPERTY, PROP_KEY_CATEGORIES);
                map.put(GROUP_2_PROPERTY_VALUE, PropertyKey.CATEGORY_NAMESPACE + ":" + category);
                map.put(GROUP_2_PROPERTY_OPERATION, EQUALS);
            }

            map.put(GROUP_3_PROPERTY, PROP_HIDEIN_NAV);
            map.put(GROUP_3_PROPERTY_VALUE, TRUE);
            map.put(GROUP_3_PROPERTY_OPERATION, UNEQUALS);

            map.put(GROUP_4_PROPERTY, PROP_SLING_RESOURCE_TYPE);
            map.put(GROUP_4_PROPERTY_VALUE, BLOG_ARTICLE_TEMPLATE_PATH);
            map.put(GROUP_4_PROPERTY_OPERATION, EQUALS);


            if (orderBy.equals(GlobalKeys.ORDER_BY_DATE)) {
                map.put(ORDER_BY, PROP_DATE);
            } else if (orderBy.equals(GlobalKeys.ORDER_BY_TITLE)) {
                map.put(ORDER_BY, PROP_TITLE);
            }
            map.put(ORDER_BY_SORT, orderSort);

            int startIndex = Integer.parseInt(selector);
            int limit = Integer.parseInt(itemPerPage);

            map.put(P_LIMIT, String.valueOf(limit));

            Query query = builder.createQuery(PredicateGroup.create(map), session);
            query.setStart(startIndex);
            SearchResult result = query.getResult();
            long totalMatches = result.getTotalMatches();
            LOG.info("Total matches " + totalMatches);
            LOG.info("query [ " + map.toString() + "]");

            this.matches = String.valueOf(totalMatches);

            for (Hit hit : result.getHits()) {
                try {
                    Node node = hit.getNode().getNode(PROP_JCR_CONTENT);

                    if (node == null) {
                        LOG.warn("JCR content instance is null");
                        continue;
                    }
                    if (!WCMMode.EDIT.equals(WCMMode.fromRequest(request))) {
                        if (!isResourceActiveOnPublish(node, PropertyKey.PROP_KEY_ON_TIME) ||
                                !isResourceActiveOnPublish(node, PropertyKey.PROP_KEY_OFF_TIME)) {

                            LOG.warn("RESOURCE IS NOT ACTIVE ON PUBLISH " + node.getName());
                            continue;
                        }
                    }
                    Property title = node.getProperty(PROP_JCR_TITLE);
                    String desc = getOptionalProperty(node, PROP_JCR_DESCRIPTION);
                    Property date = getCreationDate(node);
                    String imagePath = getOptionalProperty(node, PROP_IMAGE_PATH);
                    String authorImagePath = getOptionalProperty(node, PROP_AUTHOR_IMAGE);
                    String authorName = getOptionalProperty(node, PROP_AUTHOR_NAME);
                    List<SocialIcon> socials = getSocialIcons(hit, resourceResolver, request);
                    String aCategory = retrieveCategoryFromValues(node, category, locale);

                    ArticleBriefItem item = new ArticleBriefItem();
                    item.setLink(hit.getPath());
                    item.setTitle(title.getString());
                    item.setText(desc);
                    item.setDate(DateTimeUtil.getFormattedStringDate_short(date.getString()));
                    item.setImagePath(imagePath);
                    item.setAuthorImagePath(authorImagePath);
                    item.setAuthorName(authorName);
                    item.setCategory(aCategory);
                    item.setSocials(socials);

                    resources.add(item);

                } catch (RepositoryException ex) {
                    StringBuilder exceptionMessage = new StringBuilder();
                    exceptionMessage.append(hit.getPath());
                    exceptionMessage.append(ex.getMessage());
                    LOG.warn(ExceptionKeys.INVALID_PAGE_FOUND, exceptionMessage.toString());
                    LOG.warn(exceptionMessage.toString());
                } catch (NullPointerException ex) {
                    LOG.info("NO  CQ:TAGS FOUND " + hit.getPath());
                }
            }
        } catch (Exception e) {
            LOG.info(ExceptionKeys.SOMETHING_WENT_WRONG_WITH_SESSION, e);
        } finally {
            if (session != null && session.isLive()) {
                session.logout();
            }
            if (resourceResolver != null && resourceResolver.isLive()) {
                resourceResolver.close();
            }
        }
        return resources;
    }


    @Override
    public List<ArticleBriefItem> getReleaseArticles(String[] startPaths, String itemPerPage,
                                                     String[] categories, String[] tags, String orderBy, String orderSort, String releaseImagePath, SlingHttpServletRequest request) throws GenericException {

        List<ArticleBriefItem> resource = new ArrayList();
        if (Validator.isEmpty(startPaths)) {

            throw new GenericException("StartPath is required! Please fill it");
        }

        ResourceResolver resourceResolver = null;
        Session session = null;
        try {

            Map<String, Object> param = new HashMap<>();
            param.put(ResourceResolverFactory.USER, "g2m-tech-user");
            resourceResolver = resolverFactory.getServiceResourceResolver(param);
            session = resourceResolver.adaptTo(Session.class);


            Map<String, String> map = new HashMap<>();

            // Start paths
            for (int i = 0; i < startPaths.length; i++) {
                StringBuilder predicate = new StringBuilder();
                predicate.append(GROUP_1_GROUP_1).append(DOT).append(i + 1).append(UNDERSCORE).append(PATH);
                map.put(predicate.toString(), startPaths[i]);
            }
            map.put(GROUP_1_GROUP_1_P_OR, TRUE);

            //  type = cq page,
            map.put(GROUP_2_GROUP_1_TYPE, PROP_CQ_PAGE);

            map.put(GROUP_2_GROUP_1_PROPERTY_1, PROP_HIDEIN_NAV);
            map.put(GROUP_2_GROUP_1_PROPERTY_1_VALUE, TRUE);
            map.put(GROUP_2_GROUP_1_PROPERTY_1_OPERATION, UNEQUALS);


            if (!Validator.isEmpty(tags)) {
                map.put(GROUP_2_GROUP_1_PROPERTY_2, PROP_CQ_TAGS);
                //  "V1" or "V2" or "V3" or "V-n"
                for (int i = 0; i < tags.length; i++) {
                    StringBuilder propertyValue = new StringBuilder();
                    propertyValue.append(GROUP_2_GROUP_1).append(DOT).append(PROPERTY_2).append(DOT).append(i + 1).append(UNDERSCORE).append(VALUE);
                    map.put(propertyValue.toString(), tags[i]);
                }
                map.put(GROUP_2_GROUP_1_PROPERTY_2_OR, TRUE);
            }
            if (!Validator.isEmpty(categories)) {
                map.put(GROUP_2_GROUP_1_PROPERTY_3, PROP_CQ_CATEGORIES);
                //  "V1" or "V2" or "V3" or "V-n"
                for (int i = 0; i < categories.length; i++) {
                    StringBuilder propertyValue = new StringBuilder();
                    propertyValue.append(GROUP_2_GROUP_1).append(DOT).append(PROPERTY_3).append(DOT).append(i + 1).append(UNDERSCORE).append(VALUE);
                    map.put(propertyValue.toString(), categories[i]);
                }
                map.put(GROUP_2_GROUP_1_PROPERTY_3_OR, TRUE);
            }
            map.put(GROUP_2_GROUP_1_P_AND, TRUE);
/*
in case when tags are selected   category is set to undefined  and tags = selected tag(s)
 */
            if (orderBy.equals(GlobalKeys.ORDER_BY_DATE)) {
                map.put(ORDER_BY, PROP_DATE);
            } else if (orderBy.equals(GlobalKeys.ORDER_BY_TITLE)) {
                map.put(ORDER_BY, PROP_TITLE);
            }
            map.put(ORDER_BY_SORT, orderSort);

            int limit = Integer.parseInt(itemPerPage);

            map.put(P_LIMIT, String.valueOf(limit));

            Query query = builder.createQuery(PredicateGroup.create(map), session);
            query.setStart(0);
            SearchResult result = query.getResult();

            long totalMatches = result.getTotalMatches();
            this.matches = String.valueOf(totalMatches);
            LOG.info("Provided query string " + map.toString());

            for (Hit hit : result.getHits()) {
                try {
                    Node node = hit.getNode().getNode(PROP_JCR_CONTENT);

                    if (node == null) {
                        LOG.warn("JCR content instance is null");
                        continue;
                    }

                    if (!WCMMode.EDIT.equals(WCMMode.fromRequest(request))) {
                        if (!isResourceActiveOnPublish(node, PropertyKey.PROP_KEY_ON_TIME) ||
                                !isResourceActiveOnPublish(node, PropertyKey.PROP_KEY_OFF_TIME)) {

                            LOG.warn("RESOURCE IS NOT ACTIVE ON PUBLISH " + node.getName());
                            continue;
                        }
                    }
                    Property title = node.getProperty(PROP_JCR_TITLE);
                    Property date = getCreationDate(node);
                    String desc = getOptionalProperty(node, PROP_JCR_DESCRIPTION);
                    String imagePath = getOptionalProperty(node, (PROP_IMAGE_PATH));

                    ArticleBriefItem item = new ArticleBriefItem();
                    item.setLink(hit.getPath());
                    item.setTitle(title.getString());
                    item.setText(desc);
                    item.setDate(DateTimeUtil.getFormattedStringDate(date.getString()));

                    if (releaseImagePath != null && !releaseImagePath.isEmpty() && isImagePathDefaultOrEmpty(imagePath)) {
                        item.setImagePath(releaseImagePath);
                    } else {
                        item.setImagePath(imagePath);
                    }
                    resource.add(item);

                } catch (RepositoryException ex) {
                    StringBuilder exceptionMessage = new StringBuilder();
                    exceptionMessage.append(hit.getPath());
                    exceptionMessage.append(ex.getMessage());
                    LOG.warn(ExceptionKeys.INVALID_PAGE_FOUND + exceptionMessage.toString());
                } catch (NullPointerException ex) {
                    LOG.warn("No cq:tags defined for resource  " + hit.getPath());
                }
            }

        } catch (Exception e) {
            LOG.info(ExceptionKeys.SOMETHING_WENT_WRONG_WITH_SESSION + e);
        } finally {
            if (session != null && session.isLive()) {
                session.logout();
            }
            if (resourceResolver != null && resourceResolver.isLive()) {
                resourceResolver.close();
            }
        }
        return resource;
    }


    @Override
    public String getMatches() {
        LOG.info("Returning matches : " + this.matches);
        return this.matches;
    }

    private String getCategoryName(String props) {
        String categoryName = "";
        int i = props.indexOf(':');
        if (i != -1) {
            categoryName = props.substring(++i);
        }
        return categoryName;
    }

    private Property getCreationDate(Node node) throws RepositoryException {
        Property date = null;
        try {
            if (node != null) {
                date = node.getProperty(PROP_CREATION_DATE);
            } else {
                LOG.warn("Failed to get property=" + PROP_CREATION_DATE + ", node instance is null");
            }
        } catch (RepositoryException e) {
            try {
                date = node.getProperty(PROP_ON_TIME);
            } catch (RepositoryException e1) {
                date = node.getProperty(PROP_JCR_CREATED);
            }
        }
        return date;
    }

    private Property getDamFileTitle(Node node) throws RepositoryException {
        Node metadata = node.getNode(METADATA);
        Property title = null;
        try {
            if (metadata != null) {
                title = metadata.getProperty(PROP_DC_TITLE);
            } else {
                LOG.warn("Failed to get property=" + PROP_DC_TITLE + ", metadata node is null");
            }
        } catch (RepositoryException e) {
            try {
                title = metadata.getProperty(PROP_PDF_TITLE);
            } catch (RepositoryException e1) {
                title = metadata.getProperty(PROP_JCR_TITLE);
            }
        }
        return title;
    }

    private String retrieveCategoryFromValues(Node node, String propCategory, Locale locale) throws RepositoryException {
        final StringBuilder aCategory = new StringBuilder();
        try {
            if (node == null) {
                LOG.warn("Failed to get property=" + propCategory + ", Node instance is null");
            }
            Property articleCategory = node.getProperty(PROP_CATEGORIES);
            Value[] values = articleCategory.getValues();
            //if no category filter available - ex. blogoverview or tagoverview page article brief item will be labeled with values[0] category item
            if (!Validator.isEmpty(values)) {
                if (Validator.isEmpty(propCategory)) {
                    List<Tag> tags = tagManagerService.resolveToTag(new String[]{values[0].getString()});
                    return (!tags.isEmpty()) ? tags.get(0).getLocalizedTitle(locale) : "";
                }
                //if category filter available - ex. categoryoverview page article brief item will be labeled with exact same category item as the filter is
                Arrays.stream(values).forEach(e -> {
                    try {
                        String val = getCategoryName(e.getString());
                        if (propCategory.equals(val)) {
                            List<Tag> tags = tagManagerService.resolveToTag(new String[]{e.getString()});
                            if (!tags.isEmpty()) {
                                aCategory.append(tags.get(0).getLocalizedTitle(locale));
                            }
                            LOG.info("Category found  equals " + aCategory +" / locale"+ locale);
                        }
                    } catch (RepositoryException ex) {
                        LOG.info(" " + ex);
                    }
                });
                return aCategory.toString();
            }
            LOG.info("Oops !  BlogArticle page invalid category property");
        } catch (RepositoryException e) {
            LOG.warn("Property not found:" + PROP_CATEGORIES + "=" + propCategory +
                    ",  for resource " + node.getPath());
        }
        return aCategory.toString();
    }

    /**
     * If no property available returns empty String otherwise  property value
     */
    private String getOptionalProperty(Node node, String propName) throws RepositoryException {
        StringBuilder sb = new StringBuilder();
        try {
            if (node == null) {
                LOG.warn("Failed to get property=" + propName + ", node instance is null");
            }
            Property value = node.getProperty(propName);
            sb.append(value.getString());
        } catch (RepositoryException ex) {
            LOG.warn("Optional property not found: " + propName + "=null " +
                    ",  for resource " + node.getPath());
        }
        return sb.toString();
    }

    private List<SocialIcon> getSocialIcons(Hit hit, ResourceResolver resourceResolver, SlingHttpServletRequest request) {

        List<SocialIcon> socialIcons = new ArrayList<>();
        try {
            Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);
            final SlingHttpServletRequest slingRequest = (SlingHttpServletRequest) request;

            Page currentPage = resourceResolver.getResource(hit.getPath()).adaptTo(Page.class);
            Page appRoot = PageUtils.getApplicationRoot(currentPage);

            LOG.info("Application root " + appRoot.getName());

            String pageUrl = externalizer.externalLink(resourceResolver, appRoot.getName(), currentPage.getPath()) + DOT_HTML;

            LOG.info("Domain " + appRoot.getName() + " to be used for  resource URL  " + pageUrl);
            socialIcons = PagePropertyUtil.initSocials(currentPage, PropertyKey.PROP_KEY_ASOCIALS);

            for (SocialIcon socialIcon : socialIcons) {
                socialIcon.setPageUrl(pageUrl);
            }
        } catch (RepositoryException e) {
            LOG.warn("RepositoryException : Property not found", e.getMessage());
        } catch (PageNotFoundException ex) {
            LOG.warn("RepositoryException : Page not found", ex.getMessage());
        }

        return socialIcons;
    }

    // Sort articles by date and title
    private List<ArticleBriefItem> sortResultList(List<ArticleBriefItem> pages, String orderBy, String sortBy) {

        if (TITLE.equals(orderBy)) {
            if (ASCENDING.equals(sortBy)) {
                Collections.sort(pages, new Comparator<ArticleBriefItem>() {
                    @Override
                    public int compare(ArticleBriefItem o1, ArticleBriefItem o2) {
                        if (o1.getTitle() == null || o2.getTitle() == null)
                            return 0;
                        return o2.getTitle().compareToIgnoreCase(o1.getTitle());
                    }
                });
            } else {
                Collections.sort(pages, new Comparator<ArticleBriefItem>() {
                    @Override
                    public int compare(ArticleBriefItem o1, ArticleBriefItem o2) {
                        if (o1.getTitle() == null || o2.getTitle() == null)
                            return 0;
                        return o1.getTitle().compareToIgnoreCase(o2.getTitle());
                    }
                });
            }
        } else {
            if (ASCENDING.equals(sortBy)) {
                Collections.sort(pages, new Comparator<ArticleBriefItem>() {
                    @Override
                    public int compare(ArticleBriefItem o1, ArticleBriefItem o2) {
                        Date date1 = null;
                        Date date2 = null;
                        try {
                            date1 = format.parse(o1.getDate());
                            date2 = format.parse(o2.getDate());
                        } catch (ParseException e) {
                            LOG.warn("Incorrect date:", e.getMessage());
                        }
                        return date1.compareTo(date2);

                    }
                });
            } else {
                Collections.sort(pages, new Comparator<ArticleBriefItem>() {
                    @Override
                    public int compare(ArticleBriefItem o1, ArticleBriefItem o2) {
                        Date date1 = null;
                        Date date2 = null;
                        try {
                            date1 = format.parse(o1.getDate());
                            date2 = format.parse(o2.getDate());
                        } catch (ParseException e) {
                            LOG.warn("Incorrect date :", e.getMessage());
                        }
                        return date2.compareTo(date1);
                    }
                });
            }
        }
        return null;
    }

    private String getExtensionFromPath(Node articlePage) {
        String extension = "";
        try {
            Property relativePath = articlePage.getProperty(PROP_DAM_RELATIVE_PATH);
            String strRelativePath = relativePath.getString();
            int index = strRelativePath.lastIndexOf(DOT);
            extension = "[" + strRelativePath.substring(index + 1) + "]";
        } catch (RepositoryException e) {
            e.printStackTrace();
        }
        return extension;
    }

    public TagManagerService getTagManagerService() {
        return tagManagerService;
    }

    public void setTagManagerService(TagManagerService tagManagerService) {
        this.tagManagerService = tagManagerService;
    }

    private boolean isImagePathDefaultOrEmpty(String imagePath) {
        return imagePath == null || imagePath.isEmpty() || DEFAULT_IMAGE_PATH.equals(imagePath);
    }

    //When onTime/offTime property  set is  to check whether the resource is active on publish or not
    //To ensure no dormant resource is shown on overview pages
    private boolean isResourceActiveOnPublish(Node node, String propertyKey) throws RepositoryException, GenericException {

        String property = getOptionalProperty(node, propertyKey);


        if (!property.isEmpty()) {

            if (PropertyKey.PROP_KEY_ON_TIME.equals(propertyKey)) {
                LOG.info("ONTIME _IS ACTIVE " + DateTimeUtil.isBefore(property));

                return DateTimeUtil.isBefore(property);
            }
            if (PropertyKey.PROP_KEY_OFF_TIME.equals(propertyKey)) {
                LOG.info("OFFTIME _IS ACTIVE " + DateTimeUtil.isBefore(property));

                return DateTimeUtil.isAfter(property);
            }
        }

        return true;


    }


    public QueryBuilder getBuilder() {
        return builder;
    }

    public void setBuilder(QueryBuilder builder) {
        this.builder = builder;
    }
}
