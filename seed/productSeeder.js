let Product = require('../models/product');
let mongoose = require('mongoose');

// This productSeeder file will be executed manually  so it will save these products to database!!
mongoose.connect('mongodb://localhost:27017/shopping', function(err/*, connection*/) {       // Connecting to MongoDB(shopping)
    if (err) {
        console.log('Cannot connect to the database: ' + err);
    } else {
        console.log('Successfully connected to MongoDB');
        /*user.initializeAdmin(connection);*/
    }
});

let products = [
    new Product({
    imagePath: 'https://cb2.scene7.com/is/image/CB2/BordeauxChairFrameSHS17_16x9/?$web_zoom_furn_hero$&161012154820&wid=1008&hei=567',
    title: 'Office Chair',
    description: 'One of the basic pieces of furniture, a chair is a type of seat. Its primary features are two pieces of a durable material, attached as back and seat to one another at ...',
    price: 30
}),
    new Product({
        imagePath: 'https://cb2.scene7.com/is/image/CB2/BordeauxChairFrameSHS17_16x9/?$web_zoom_furn_hero$&161012154820&wid=1008&hei=567',
        title: 'Office Chair',
        description: 'One of the basic pieces of furniture, a chair is a type of seat. Its primary features are two pieces of a durable material, attached as back and seat to one another at ...',
        price: 30
    }),
    new Product({
        imagePath: 'https://cb2.scene7.com/is/image/CB2/BordeauxChairFrameSHS17_16x9/?$web_zoom_furn_hero$&161012154820&wid=1008&hei=567',
        title: 'Office Chair',
        description: 'One of the basic pieces of furniture, a chair is a type of seat. Its primary features are two pieces of a durable material, attached as back and seat to one another at ...',
        price: 30
    }),
    new Product({
        imagePath: 'https://cb2.scene7.com/is/image/CB2/BordeauxChairFrameSHS17_16x9/?$web_zoom_furn_hero$&161012154820&wid=1008&hei=567',
        title: 'Office Chair',
        description: 'One of the basic pieces of furniture, a chair is a type of seat. Its primary features are two pieces of a durable material, attached as back and seat to one another at ...',
        price: 30
    }),
    new Product({
        imagePath: 'https://cb2.scene7.com/is/image/CB2/BordeauxChairFrameSHS17_16x9/?$web_zoom_furn_hero$&161012154820&wid=1008&hei=567',
        title: 'Office Chair',
        description: 'One of the basic pieces of furniture, a chair is a type of seat. Its primary features are two pieces of a durable material, attached as back and seat to one another at ...',
        price: 30
    }),
    new Product({
        imagePath: 'https://cb2.scene7.com/is/image/CB2/BordeauxChairFrameSHS17_16x9/?$web_zoom_furn_hero$&161012154820&wid=1008&hei=567',
        title: 'Office Chair',
        description: 'One of the basic pieces of furniture, a chair is a type of seat. Its primary features are two pieces of a durable material, attached as back and seat to one another at ...',
        price: 30
    }),

];

//Prevent from disconnecting before all items are saved in database
let done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save(() => {
        done++;
        if (done === products.length){
            exit();
        }
    });
}
function exit() {
    mongoose.disconnect();
}
