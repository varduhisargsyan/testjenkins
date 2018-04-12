package com.worldline.core.services;

import com.day.cq.tagging.JcrTagManagerFactory;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.util.PropertyKey;
import com.worldline.core.util.ExceptionKeys;
import com.worldline.core.util.Validator;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/*
Author Varduhi Sargsyan A631192
 */
@Service(value = TagManagerService.class)
@Component(/*metatype = true, */immediate = true)
public class TagManagerServiceImpl implements TagManagerService {
    @Reference
    private JcrTagManagerFactory jcrTagManagerFactory;
    @Reference
    private ResourceResolverFactory resolverFactory;
    private static final Logger LOG = LoggerFactory.getLogger(TagManagerServiceImpl.class);


    @Override
    public Map<String, String> getTagsByNamespace(String namespace, Locale locale) {
        Map<String, String> tags = new HashMap<>();

        try {
            Map<String, Object> param = new HashMap<>();
            param.put(ResourceResolverFactory.SUBSERVICE, "countryDDAdapter");
            param.put(ResourceResolverFactory.USER, "g2m-tech-user");
            ResourceResolver resolver = resolverFactory.getServiceResourceResolver(param);
            TagManager tagManager = jcrTagManagerFactory.getTagManager(resolver);

            if (tagManager == null) {
                throw new GenericException("Failed to load Tag manager");

            } else {
                Tag[] namespaces = tagManager.getNamespaces();

                if (Validator.isEmpty(namespaces)) {
                    throw new GenericException("Failed tag namespaces : empty or null");
                }
                LOG.info("Searching namespace [" + namespace + "]");
                for (Tag root : namespaces) {
                    if (namespace.equals(root.getName())) {
                        LOG.info("Namespace found [" + root.getName() + "]");
                        Iterator<Tag> it = root.listChildren();
                        //get all tags in namespace
                        while (it.hasNext()) {
                            Tag tag = it.next();
                            if(PropertyKey.BLOG_NAMESPACE.equals(namespace)) {
                                if (tag.getCount() > 0) {   //prevent displaying unused tags in menu
                                    tags.put(tag.getName(), tag.getLocalizedTitle(locale));
                                }
                            }else {
                                tags.put(tag.getName(), tag.getLocalizedTitle(locale));
                            }
                        }
                        break;
                    }
                }
            }
        } catch (Exception ex) {
            LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
        }
        return tags;
    }

    @Override
    public boolean isInBlogNamespace(String name, Locale locale) {
        LOG.info("Searching overviewPage name in [blog] namespace ");
        boolean isKey=getTagsByNamespace(PropertyKey.BLOG_NAMESPACE, null).containsKey(name);
        LOG.info("BlogNamespace contains key: "+ name+ " = "+isKey);
        return isKey ;
    }

    @Override
    public boolean isInCategoryNamespace(String name, Locale locale) {
        LOG.info("Searching overviewPage name in [category] namespace ");
        boolean isKye=getTagsByNamespace(PropertyKey.CATEGORY_NAMESPACE, null).containsKey(name);
        LOG.info("CategoryNamespace contains key: "+ name+" = " +isKye);
        return isKye;

    }

    @Override
    public List <Tag> resolveToTag(String[] tagNames) {
     List<Tag> tags=new ArrayList<>();
      try {
          Map<String, Object> param = new HashMap<>();
          param.put(ResourceResolverFactory.SUBSERVICE, "countryDDAdapter");
          param.put(ResourceResolverFactory.USER, "g2m-tech-user");
          ResourceResolver resolver = resolverFactory.getServiceResourceResolver(param);
          TagManager tagManager = jcrTagManagerFactory.getTagManager(resolver);
         // to resolve each tag name to tag Title
          if (!Validator.isEmpty(tagNames)) {
              Arrays.stream(tagNames).forEach(e->{
               Tag tag=   tagManager.resolve(e);
               LOG.info("Tags resolved  "+ tag.getName()+"/"+tag.getTitle());
               tags.add(tag);
              });
          }
      }catch (Exception ex){
          LOG.error("Oops ! Failed to resolve tag names to title ");
          LOG.error(PropertyKey.UNEXPECTED_EXCEPTION, ex);
      }

      return tags;
    }

    public JcrTagManagerFactory getJcrTagManagerFactory() {
        return jcrTagManagerFactory;
    }

    public void setJcrTagManagerFactory(JcrTagManagerFactory jcrTagManagerFactory) {
        this.jcrTagManagerFactory = jcrTagManagerFactory;
    }

    public ResourceResolverFactory getResolverFactory() {
        return resolverFactory;
    }

    public void setResolverFactory(ResourceResolverFactory resolverFactory) {
        this.resolverFactory = resolverFactory;
    }
}
