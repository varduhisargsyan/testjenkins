package com.worldline.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import com.worldline.core.exceptions.GenericException;
import com.worldline.core.models.data.TwitterData;
import com.worldline.core.util.DateTimeUtil;
import com.worldline.core.util.Validator;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twitter4j.*;
import twitter4j.conf.ConfigurationBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TwitterModel extends WCMUsePojo {

    private static final Logger LOG = LoggerFactory.getLogger(TwitterModel.class);
    private static final String A_TAG_CLASS = "<a class=";
    private static final String A_TAG_HREF = " href= ";
    private static final String END_A_TAG = "</a>";
    private static final String END_TAG = ">";
    private static final String SHARP = "#";
    //CODE RE$VIEW[TwitterModel]: [Varduhi Sargsyan]  hardcoded strings are replaced by private static final String
    private static final String I_TAG ="<i>";
    private static final  String END_I_TAG ="</i>";
    private static final  String HTML_QUOTE ="\"";
    private static final String CONSUMER_KEY = "consumerKey";
    private static final String CONSUMER_SECRET = "consumerSecret";
    private static final String ACCESS_TOKEN = "accessToken";
    private static final String ACCESS_TOKEN_SECRET = "accessTokenSecret";
    private static final String HASHTAG_URL = "https://twitter.com/hashtag/";
    private static final String HASHTAG_URL_SRC = "?src=hash";
    private static final String A_HREF_STYLE = "twitter-post";

    private Status lastStatus;
    private List<Status> statuses;
    private  TwitterData lastTwitt;

    @Override
    public void activate() throws Exception {
        Map<String, String> twitterTokens = getTokensFromPageProperties(2);

//CODE REVIEW [TwitterModel]: [VARDUHI SARGSYAN ]  when twitter credentials are not set in level 2  model stops further proccessing
        if (twitterTokens==null || twitterTokens.isEmpty()) {
            LOG.info("Twitter account credentials must be set in /gotomarket/{lang} level");
            return;
        }
        initConfiguration(twitterTokens);
        lastTwitt= new TwitterData(lastStatus.getUser().getScreenName(), convertToHtml(lastStatus), DateTimeUtil.convert(lastStatus.getCreatedAt()));

    }

    private void initConfiguration(Map<String, String> tokens) throws GenericException {
        try {
            ConfigurationBuilder cb = new ConfigurationBuilder();
            cb.setDebugEnabled(true)
                    .setHttpProxyHost("proxy-prod.priv.atos.fr")
                    .setHttpProxyPort(3128)
                    .setOAuthConsumerKey(tokens.get(CONSUMER_KEY))
                    .setOAuthConsumerSecret(tokens.get(CONSUMER_SECRET))
                    .setOAuthAccessToken(tokens.get(ACCESS_TOKEN))
                    .setOAuthAccessTokenSecret(tokens.get(ACCESS_TOKEN_SECRET));

            TwitterFactory tf = new TwitterFactory(cb.build());
            Twitter twitter = tf.getInstance();

            statuses = twitter.getUserTimeline();
            LOG.info("TWITER SIZE ", statuses.size());
            lastStatus = statuses.get(0);

        } catch (TwitterException te) {
            LOG.warn("Can not get user timeline from twitter");
        }
    }


    public List<List<TwitterData>> getLastTwitts() {
        List<List<TwitterData>> lastTwitts = new ArrayList<>();
        List<TwitterData> twitts = new ArrayList<>();
        for (int i = 0; i < statuses.size(); i++) {
            twitts.add(new TwitterData(statuses.get(i).getUser().getScreenName(), convertToHtml(statuses.get(i)), DateTimeUtil.convert(statuses.get(i).getCreatedAt())));
            if ((i + 1) % 3 == 0) {
                lastTwitts.add(twitts);
                twitts = new ArrayList<>();
            }
        }
        return lastTwitts;
    }

    private Map<String, String> getTokensFromPageProperties(int languagePageLevel) {
        Map<String, String> tokens = new HashMap<>();
        try {
            Page page = getCurrentPage().getAbsoluteParent(languagePageLevel);
            ValueMap values = page.getProperties();
            if (!values.isEmpty()) {
                //CODE REVIEW [TwitterModel]: [VARDUHI SARGSYAN ]  get twitterCredentials by using get(String key , Class<T>.class) to avoid NullPointerException when prop is not set
                final String propConsumerKey= values.get(CONSUMER_KEY, String.class);
                final String propConsumerSecret= values.get(CONSUMER_SECRET, String.class);
                final String propAccessToken= values.get(ACCESS_TOKEN, String.class);
                final String propAccessTokenSecret= values.get(ACCESS_TOKEN_SECRET, String.class);
                if(!Validator.isEmpty(propAccessToken) && !Validator.isEmpty(propConsumerKey)
                        && !Validator.isEmpty(propAccessTokenSecret) && !Validator.isEmpty(propConsumerSecret)) {
                    tokens.put(CONSUMER_KEY, values.get(CONSUMER_KEY).toString());
                    tokens.put(CONSUMER_SECRET, values.get(CONSUMER_SECRET).toString());
                    tokens.put(ACCESS_TOKEN, values.get(ACCESS_TOKEN).toString());
                    tokens.put(ACCESS_TOKEN_SECRET, values.get(ACCESS_TOKEN_SECRET).toString());
                    LOG.info("Twitter tokens are successfully set");
                    return tokens;
                }
            }
            LOG.warn("Twitter credentials expected to be set in page "+ page.getPath());
        }catch (Exception ex){
            LOG.error("Failed to get properties : Twitter credentials");
        }
        return tokens;
    }
    //CODE RE$VIEW[TwitterModel]: [Varduhi Sargsyan] changes are made in html code generation
    private static String convertToHtml(Status status) {
        String sb = status.getText();
        URLEntity[] urlEntities = status.getURLEntities();
        MediaEntity[] mediaEntities = status.getMediaEntities();
        HashtagEntity[] hashtagEntities = status.getHashtagEntities();

        for (URLEntity url : urlEntities) {
            sb = sb.replace(url.getURL(), A_TAG_CLASS + A_HREF_STYLE + A_TAG_HREF + url.getURL() + END_TAG + I_TAG+ url.getURL() +END_I_TAG+ END_A_TAG);
        }
        for (HashtagEntity hashtag : hashtagEntities) {
            StringBuilder builder = new StringBuilder();
            builder.append(A_TAG_CLASS);
            builder.append(HTML_QUOTE);
            builder.append(A_HREF_STYLE);
            builder.append(HTML_QUOTE);
            builder.append(A_TAG_HREF);
            builder.append(HTML_QUOTE);
            builder.append(HASHTAG_URL);
            builder.append(hashtag.getText());
            builder.append(HASHTAG_URL_SRC);
            builder.append(HTML_QUOTE);
            builder.append(END_TAG);
            builder.append(I_TAG);
            builder.append(SHARP);
            builder.append(hashtag.getText());
            builder.append(END_I_TAG);
            builder.append(END_A_TAG);
            sb = sb.replace(SHARP + hashtag.getText(), builder.toString());
        }
        for (MediaEntity media : mediaEntities) {
            sb = sb.replace(media.getURL(), A_TAG_CLASS + A_HREF_STYLE + A_TAG_HREF + media.getURL() + END_TAG + I_TAG+ media.getURL()+"</i>" + END_A_TAG);
        }

        return sb;
    }

    public TwitterData getLastTwitt() {
        return this.lastTwitt;
    }

    public void setLastTwitt(TwitterData lastTwitt) {
        this.lastTwitt = lastTwitt;
    }
}
