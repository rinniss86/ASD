function(doc) {
  if (doc._id.substr(0, 5) === "order" {
    emit(doc._id,{
    	"name": doc.name,
    	"age": doc.age,
    	"crave": doc.crave,
    	"fav": doc.fav,
    	"hunger": doc.hunger,
    	"date": doc.date,
    	"select": doc.select,
    	"comment": doc.comment
    });
  }
};