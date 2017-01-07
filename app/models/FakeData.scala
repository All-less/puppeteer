package models

import java.util.concurrent.atomic.AtomicInteger

import sangria.relay.Identifiable
import sangria.relay.Node
import sangria.relay.{Identifiable, Node}


object FakeData {

  case class Watch(value: Int)

  class FakeDataRepo {
    def getWatch(init: Int): Watch = {
      new Watch(init)
    }
  }
}
