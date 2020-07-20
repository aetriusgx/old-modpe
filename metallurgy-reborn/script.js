var enable_mod;
var block_data = [];
var item_data = [];
var metallurgy = {};

var OreBuffer = new ArrayBuffer(16);
var ViewOreBuffer = new Int32Array(OreBuffer);

var mod_directory = "/games/com.mojang/minecraftpe/mods/metallurgy/";

Level.saveWorldFile = function(filename, content){try {java.io.File(android.os.Environment.getExternalStorageDirectory().getPath() + "/games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/").mkdirs();var newFile = new java.io.File(android.os.Environment.getExternalStorageDirectory().getPath() + "/games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/", filename);newFile.createNewFile();var outWrite = new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));outWrite.append(content);outWrite.close();} catch (err) {print(err);}};
Level.loadFile = function(filename){var content = "";if (java.io.File( android.os.Environment.getExternalStorageDirectory().getPath() + "/games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/" + filename).exists()) {var file = new java.io.File(android.os.Environment.getExternalStorageDirectory().getPath() + "/games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/" + filename),fos = new java.io.FileInputStream(file),str = new java.lang.StringBuilder(),ch;while ((ch = fos.read()) != -1) {str.append(java.lang.Character(ch));}content = String(str.toString());fos.close();}return content;};
ModPE.readFile = function(directory){var content = "";if (java.io.File( android.os.Environment.getExternalStorageDirectory().getPath() + directory).exists()) {var file = new java.io.File(android.os.Environment.getExternalStorageDirectory().getPath() + directory),fos = new java.io.FileInputStream(file),str = new java.lang.StringBuilder(),ch;while ((ch = fos.read()) != -1) {str.append(java.lang.Character(ch));}content = String(str.toString());fos.close();}return content;};

metallurgy.initBlockData = function(){
	for(var i in block_data){
		if(block_data[i].generation != undefined){
			let block = block_data[i];	
			Ores(block.ID.ore, block.generation);
		}
	}
}

function runMod(){
	let json_block_data = JSON.parse(ModPE.readFile(mod_directory + "blocks.json"));
	block_data.push(json_block_data);
	let json_item_data = JSON.parse(ModPE.readFile(mod_directory + "items.json"));
	item_data.push(json_item_data);
	if(block_data.length > 0 && item_data.length > 0){
		metallurgy.initBlockData();
	}
}

function newLevel(){
	var scripts = com.zhuoweizhang.mcpelauncher.ScriptManager.script();
	if(java.io.File(android.is.Environment.getExternalStorageDirectory().getPath(mod_directory + "items.json").exists()) && java.io.File(android.is.Environment.getExternalStorageDirectory().getPath(mod_directory + "blocks.json").exists())){
		for(var i = 0; i < scripts.size(); i++){
			var script = scripts[i];
			if(script.name == "blocks" && script.name == "items"){
      				enable_mod = true;
				Level.saveWorldFile("metallurgy_activation", enable_mod);
    			} else {
				alert("items.json and blocks.json must be placed in the correct folder (/games/com.mojang/minecraftpe/mods/metallurgy/)");
				enable_mod = false;
				Level.saveWorldFile("metallurgy_activation", enable_mod);
			}
  		}
	}
	if(Level.getTile(Player.getX(), Player.getY() - 1, Player.getZ()) > 0){
		runMod();
	}
}

function modTick(){
  	for(var i in Ores){
		Ores[i].generate();
	}
}

var Ores = function([blockId], [generation]){
	this.blockId = blockId;
	this.minY = generation[2];
	this.maxY = generation[1];
	this.rarity = generation[0];
	this.generate = function(){
		let ChunkSize_X = function(){
			if(Math.random() < .5){
				return Player.getX() + (Math.random() * 15);
			} else {
				return Player.getX() - (Math.random() * 15);
			}
		}
		let ChunkSize_Y = function(){
			if(Math.random() < .5){
				return Player.getY() + (Math.random() * 127);
			} else {
				return Player.getY() - (Math.random() * 127);
			}
		}
		let ChunkSize_Z = function(){
			if(Math.random() < .5){
				return Player.getZ() + (Math.random() * 15);
			} else {
				return Player.getZ() - (Math.random() * 15);
			}
		}
		switch(Player.getDimension()){
			case DimensionId.NORMAL:
				if(Level.getTile(chunkSize_X(), chunkSize_Y(), chunkSize_Z()) == 1){
					this.generateVein(chunkSize_X(), chunkSize_Y(), chunkSize_Z());
				}
				break;
			case DimensionId.NETHER:
				if(Level.getTile(chunkSize_X(), chunkSize_Y(), chunkSize_Z()) ==  87){
					this.generateVein(chunkSize_X(), chunkSize_Y(), chunkSize_Z());
				}
				break;
			case DimensionId.ENDER:
				if(Level.getTile(chunkSize_X(), chunkSize_Y(), chunkSize_Z()) == 121){
					this.generateVein(chunkSize_X(), chunkSize_Y(), chunkSize_Z())
				}
		}
	}
	this.generateVein = function(x, y, z){
		let VeinArray = [[1, 0, 0], [0, 1, 0], [0, 0, 1], //3
				[1, 1, 0], [0, 1, 1], [1, 0, 1], //6
				[-1, 0, 0], [0, -1, 0], [0, 0, -1], //9
				[-1, -1, 0], [0, -1, -1], [-1, 0, -1], //12
				[1, -1, 0], [0, 1, -1], [-1, 0, 1], //15
				[1, 1, 1], [-1, -1, -1], [0, 0, 0], //18
				[-1, 1, 0], [0, -1, 1], [1, 0, -1], //21
				[1, 1, -1], [-1, 1, 1], [1, -1, 1], //24
				[1, -1, -1], [-1, 1, -1], [-1, -1, 1]]; //27
		let rarityChance = Math.random() * this.rarity;
		if(rarityChance >= 1){
			for(var i in VeinArray){
				if(rarityChance >= 5){
					let generate_at_X = x + VeinArray[i][0];
					let generate_at_Y = y + VeinArray[i][1];
					let generate_at_Z = z + VeinArray[i][2];
					Level.setTile(generate_at_X, generate_at_Y, generate_at_Z, this.blockId[Player.getDimension()]);
				}
			}
		}
	}
	
	//this doesn't do anything to the actual generation, this part is for data purposes
	this.saveChunk = function(){
		var CurrentChunkX, CurrentChunkY, CurrentChunkZ;
		for(var AllX = -16;  AllX < 16; AllX++){
			for(var AllY = -80; AllY < 128; AllY++){
				for(var AllZ = -16; AllZ < 16; AllZ++){
					CurrentChunkX = Player.getX() + AllX;
					CurrentChunkY = Player.getY() + AllY;
					CurrentChunkZ = Player.getz() + AllZ;
				}
			}
		}
		ViewOreBuffer[0] = CurrentChunkX;
		ViewOreBuffer[1] = CurrentChunkY;
		ViewOreBuffer[2] = CurrentChunkZ;
		
		let string = "";
		if(ViewOreBuffer[0].length > 1){
			for(var i in ViewOreBuffer[0]){
				var locations_array = [ViewOreBuffer[0][i], ViewOreBuffer[1][i], ViewOreBuffer[2][i]]
				string+=locations.join(",") + ";";
			}
		}
		Level.saveWorldFile(".SpawnedChunks", string);
	}
}

function leaveGame(){}