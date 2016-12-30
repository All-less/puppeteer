
// @GENERATOR:play-routes-compiler
// @SOURCE:/Users/Loy/Temp/puppeteer/conf/routes
// @DATE:Fri Dec 30 16:51:13 CST 2016

package router

import play.core.routing._
import play.core.routing.HandlerInvokerFactory._
import play.core.j._

import play.api.mvc._

import _root_.controllers.Assets.Asset

class Routes(
  override val errorHandler: play.api.http.HttpErrorHandler, 
  // @LINE:2
  Homepage_0: controllers.Homepage,
  val prefix: String
) extends GeneratedRouter {

   @javax.inject.Inject()
   def this(errorHandler: play.api.http.HttpErrorHandler,
    // @LINE:2
    Homepage_0: controllers.Homepage
  ) = this(errorHandler, Homepage_0, "/")

  import ReverseRouteContext.empty

  def withPrefix(prefix: String): Routes = {
    router.RoutesPrefix.setPrefix(prefix)
    new Routes(errorHandler, Homepage_0, prefix)
  }

  private[this] val defaultPrefix: String = {
    if (this.prefix.endsWith("/")) "" else "/"
  }

  def documentation = List(
    ("""GET""", this.prefix, """controllers.Homepage.index"""),
    Nil
  ).foldLeft(List.empty[(String,String,String)]) { (s,e) => e.asInstanceOf[Any] match {
    case r @ (_,_,_) => s :+ r.asInstanceOf[(String,String,String)]
    case l => s ++ l.asInstanceOf[List[(String,String,String)]]
  }}


  // @LINE:2
  private[this] lazy val controllers_Homepage_index0_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix)))
  )
  private[this] lazy val controllers_Homepage_index0_invoker = createInvoker(
    Homepage_0.index,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.Homepage",
      "index",
      Nil,
      "GET",
      """ Homepage""",
      this.prefix + """"""
    )
  )


  def routes: PartialFunction[RequestHeader, Handler] = {
  
    // @LINE:2
    case controllers_Homepage_index0_route(params) =>
      call { 
        controllers_Homepage_index0_invoker.call(Homepage_0.index)
      }
  }
}
