name := """puppeteer"""

version := "0.0.1"

libraryDependencies ++= Seq(
  "org.sangria-graphql" %% "sangria-relay" % "1.0.0-RC2",
  "org.sangria-graphql" %% "sangria-play-json" % "0.3.2"
)

lazy val root = (project in file(".")).enablePlugins(PlayScala)

/**
  * Add task for generating graphql schema.
  * Use 'run generateSchema' in play console to execute the task.
  */
lazy val generateSchema = taskKey[Unit]("Generate schema.json definition.")
fullRunTask(generateSchema, Compile, "models.GenerateSchemaTask", "conf/schema.json")

scalaVersion := "2.11.8"
