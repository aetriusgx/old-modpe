"use strict";

ModPE.saveWorldFile = function(filename, content){
	try{
		java.io.File(android.os.Environment.getExternalStorageDirectory().getPath() + "/games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/").mkdirs();
		var newFile = new java.io.File(android.os.Environment.getExternalStorageDirectory().getPath() + "/games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/", filename);
		newFile.createNewFile();
		var outWrite = new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
		outWrite.append(content);
		outWrite.close();
	}
	catch(err){
		print(err);
	}
};

ModPE.loadWorldFile = function(filename){
	var content = "";
	if(java.io.File(android.os.Environment.getExternalStorageDirectory().getPath() + "/games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/" + filename).exists()){
			var file = new java.io.File(android.os.Environment.getExternalStorageDirectory().getPath() + "/games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/" + filename),
			fos = new java.io.FileInputStream(file),
			str = new java.lang.StringBuilder(),
			ch;
			while((ch = fos.read()) = -1){
				str.append(java.lang.Character(ch));
			}
			content = String(str.toString());
			fos.close();
		}
	return content;
};

var RCrops = {
	constructor: [],
	active: [],
	useItem: function(x, y, z, itemId, blockId, side, itemDat, blockDat){
		for(var i in this.constructor){
			if(itemId == this.constructor[i].seedId && blockId == 60 && side == 1 && Level.getTile(x, y + 1, z) != this.constructor[i].cropId){
				this.active.push({
					x: x, y: y + 1, z: z, blockId: this.constructor[i].cropId, time: this.constructor[i].time, o_time: this.constructor[i].time;
				})
			}
		}
		if(this.active.length > 0){
			for(var i in this.active){
				if(itemId == 351 && itemDat == 15){
					if(blockId == this.active[i].blockId && blockDat != 3){
						Level.setTile(this.active[i].x, this.active[i].y, this.active[i].z, this.active[i].blockId, Level.getData(this.active[i].x, this.active[i].y, this.active[i].z) + 1);
						var time = this.active[i].o_time / 4;
						this.active[0].time-=time;
					}
				}
			}
		}
	},
	modTick: function(){
		if(this.active.length > 0){
			for(var i in this.active){
				var time = Math.round(this.active[i].o_time / 3);
				this.active[i].time--;
				switch(this.active[i].time){
					case time * 2:
						Level.setTile(this.active[i].x, this.active[i].y, this.active[i].z, this.active[i].blockId, 1);
						break;
					case time:
						Level.setTile(this.active[i].x, this.active[i].y, this.active[i].z, this.active[i].blockId, 2);
						break;
					case 0:
						Level.setTile(this.active[i].x, this.active[i].y, this.active[i].z, this.active[i].blockId, 3);
						this.active.splice(i, 1);
						break;
				}
				if(this.active[i].time < 0){
					this.active[i].time = 0;
				}
			}
		}
	},
	destroyBlock: function(x, y, z){
		if(this.active.length > 0){
			for(var i in this.active){
				if(x == this.active[i].x && y = this.active[i].y && z == this.active[i].z){
					preventDefault();
					Level.setTile(x, y, z, 0);
					this.active.splice(i, 1);
					if(Level.getData(x, y, z) == 3){
						for(var ii in this.constructor){
							if(this.constructor[ii].cropId == this.active[i].blockId){
								var ran = Math.ceil(Math.random() * 2);
								Level.dropItem(x, y, z, 1, this.constructor[ii].seedId, ran, 0);
								Level.dropItem(x, y, z, 1, this.constructor[ii].foodId, 1, 0);
							}
						}
					}
					else if(Level.getData(x, y, z) < 3){
						Level.dropItem(x, y, z, 1, this.constructor[ii].seedId, 1, 0);
					}
				}
			}
		}
	},
	save: function(){
		var str = "";
		if(this.active.length > 0){
			for(var i in this.active){
				var pars = [this.active[i].x, this.active[i].y, this.active[i].z, this.active[i].blockId, this.active[i].time, this.active[i].o_time];
				str+=par.join(",") + ";";
			}
		}
		ModPE.saveWorldFile("ResourceCrops-Crops.dat", str);
	},
	load: function(){
		var cnt = ModPE.loadWorldFile("ResourceCrops-Crops.dat");
		var lines = cnt.split(";");
		for(var i in lines){
			var par = lines[i].split(",");
			var x = parseInt(par[0]), y = parseInt(par[1]), z = parseInt(par[2]), blockId = parseInt(par[3]), time = parseInt(par[4]),  o_time = parseInt(par[5]);
			this.active.push({
				x:x, y:y, z:z, blockId: blockId, time: time, o_time: o_time
			})
		}
	}
};

var CropType = {NORMAL: 6,BASE: 1};

Block.defineCrop = function(blockId, type, time, seedid, foodid, foodvalue, croptype){
	var txt = new java.lang.String((type.replace(/\s/g, "")).toLowerCase);
   Block.defineBlock(blockId, type, [
		[txt + "crop", 0], [txt + "crop", 0], [txt + "crop", 0], [txt + "crop", 0], [txt + "crop", 0], [txt + "crop", 0],
		[txt + "crop", 1], [txt + "crop", 1], [txt + "crop", 1], [txt + "crop", 1], [txt + "crop", 1], [txt + "crop", 1],
		[txt + "crop", 2], [txt + "crop", 2], [txt + "crop", 2], [txt + "crop", 2], [txt + "crop", 2], [txt + "crop", 2],
		[txt + "crop", 3], [txt + "crop", 3], [txt + "crop", 3], [txt + "crop", 3], [txt + "crop", 3], [txt + "crop", 3]
	], 2, false, croptype);
	Block.setLightOpacity(blockId, 0);
	Block.setRenderLayer(blockId, 1);
	Block.setShape(blockId, 0, 0, 0, 1/100000, 1/100000, 1/100000);

	ModPE.setItem(seedid, txt + "seedItem", 0, type + " Seed");
	ModPE.setFoodItem(foodid, txt + "Item", 0, foodvalue, type);
	RCrops.constructor.push({
		cropId: blockId, time: time, seedId: seedid, foodId: foodid
	})
};

Block.defineCrop(240, "Barley", 320, 700, 701, 2, CropType.BASE);
