
// @GENERATOR:play-routes-compiler
// @SOURCE:/Users/Loy/Temp/puppeteer/conf/routes
// @DATE:Fri Dec 30 16:51:13 CST 2016

package controllers;

import router.RoutesPrefix;

public class routes {
  
  public static final controllers.ReverseHomepage Homepage = new controllers.ReverseHomepage(RoutesPrefix.byNamePrefix());

  public static class javascript {
    
    public static final controllers.javascript.ReverseHomepage Homepage = new controllers.javascript.ReverseHomepage(RoutesPrefix.byNamePrefix());
  }

}
