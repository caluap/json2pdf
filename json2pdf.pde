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
    
    
    if (p1.isNull("x") == false && p1.isNull("y") == false && p1.isNull("z") == false &&
        p2.isNull("x") == false && p2.isNull("y") == false && p2.isNull("z") == false) {
          
        float x1,x2,y1,y2,z1,z2;
        x1 = p1.getFloat("x");
        y1 = p1.getFloat("y");
        z1 = p1.getFloat("z");
        x2 = p2.getFloat("x");
        y2 = p2.getFloat("y");
        z2 = p2.getFloat("z");
        line(x1, y1, z1, x2, y2, z2);
    }
    
  }
  
  endRaw();
  exit();
  
}
