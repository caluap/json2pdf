import processing.pdf.*;

JSONObject json, canvasProperties;
JSONArray instructions;

void setup() {  
  size(408,577, P3D);
    
  json = loadJSONObject("./data.json");  
  canvasProperties = json.getJSONObject("canvas");  
  instructions = json.getJSONArray("instructions");
}

void draw() {
  int w = canvasProperties.getInt("w"),
  h = canvasProperties.getInt("h");
  if (w != width || h != height){
    println("Resized...");
    println(width + "/" + height + "---" + w + "/" + h);
    surface.setSize(w,h);
  }
  
  
  beginRaw(PDF, "./output.pdf");
  
  fill(0);
  noStroke();
  rect(0,0,width,height);
  
  for (int i = 0; i < instructions.size(); i++) {
    JSONObject instruction = instructions.getJSONObject(i),
    p1 = instruction.getJSONObject("p1"),
    p2 = instruction.getJSONObject("p2");
    
    if (instruction.isNull("strokeColor") == false) {
      String c = "FF" + instruction.getString("strokeColor").substring(1);
      stroke(unhex(c));
    }
    if (instruction.isNull("strokeWeight") == false) {
      strokeWeight(instruction.getFloat("strokeWeight"));
    }
    
    line(p1.getFloat("x"), p1.getFloat("y"), p1.getFloat("z"),
         p2.getFloat("x"), p2.getFloat("y"), p2.getFloat("z"));
    
  }
  
  endRaw();
  exit();
  
}
