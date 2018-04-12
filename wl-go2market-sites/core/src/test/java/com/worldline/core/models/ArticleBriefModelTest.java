package com.worldline.core.models;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

/**
 * Created by davitp on 9/11/2017.
 */
public class ArticleBriefModelTest {

    @Mock
    ArticleBriefModel articleBriefModel;

    @Before
    public void init()  {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    public void activate() throws Exception {
        articleBriefModel.activate();
    }
}
