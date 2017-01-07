package controllers

import play.api._
import play.api.mvc.{Controller, Action}

class Homepage extends Controller {

    def index = Action { implicit request =>
        Ok(views.html.index())
    }
}
