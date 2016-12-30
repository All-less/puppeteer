
// @GENERATOR:play-routes-compiler
// @SOURCE:/Users/Loy/Temp/puppeteer/conf/routes
// @DATE:Fri Dec 30 16:51:13 CST 2016


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
