
// @GENERATOR:play-routes-compiler
// @SOURCE:/Users/Loy/Temp/puppeteer/conf/routes
// @DATE:Fri Dec 30 16:51:13 CST 2016

import play.api.routing.JavaScriptReverseRoute
import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset

// @LINE:2
package controllers.javascript {
  import ReverseRouteContext.empty

  // @LINE:2
  class ReverseHomepage(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:2
    def index: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Homepage.index",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + """"})
        }
      """
    )
  
  }


}
