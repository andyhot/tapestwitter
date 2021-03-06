package com.tapestwitter.domain.dao;

import org.testng.Assert;
import org.testng.annotations.Test;
import org.unitils.UnitilsTestNG;
import org.unitils.dbunit.annotation.DataSet;
import org.unitils.dbunit.annotation.ExpectedDataSet;
import org.unitils.reflectionassert.ReflectionAssert;
import org.unitils.spring.annotation.SpringApplicationContext;
import org.unitils.spring.annotation.SpringBean;

import com.tapestwitter.domain.model.Authority;
import com.tapestwitter.domain.model.User;

@SpringApplicationContext("test-config.xml")
public class IUserDAOTest extends UnitilsTestNG
{

    @SpringBean("userDAO")
    private IUserDAO userDAO;

    @SpringBean("authorityDAO")
    private IAuthorityDAO authorityDAO;
    
    @DataSet
    @Test
    public void testFindUserByUsername()
    {
        String userName = "katia";
        User user = userDAO.findByUsername(userName);
        Assert.assertNotNull(user);
        Assert.assertEquals(user.getUsername(), userName);
    }

    @DataSet
    @Test
    public void testFindUserByEmail()
    {
        String email = "katiaaresti@gmail.com";
        User user = userDAO.findByEmail(email);
        Assert.assertNotNull(user);
        Assert.assertEquals(user.getEmail(),email);
    }

    @DataSet
    @ExpectedDataSet
    @Test
    public void testCreateUser()
    {
        Authority authority = authorityDAO.findByRoleName("ROLE_USER");
        
        User actualUser = new User();
        String username = "pepe";
        actualUser.setEmail("pepe@tapestwitter.com");
        actualUser.setLogin(username);
        actualUser.setPassword("pepePassword");
        actualUser.setFullName("Pepe pepe");
        actualUser.addAuthority(authority);

        userDAO.create(actualUser);
                
        User expectedUser = userDAO.findByUsername(username);
        ReflectionAssert.assertReflectionEquals(expectedUser, actualUser);
    }
    
}
