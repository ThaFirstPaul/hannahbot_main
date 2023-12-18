// ./commands/compliment.js
// ========

var parent = require.main.exports;

module.exports = {
    name: "hhb compliment",
    description: "Compliments you or another chatter.",
    version_added: "2.0",
    commands_regex: "insult|compliment|admire|bless.*",
    usage: "compliment [user]",
    supported_platforms: ["twitch", "discord"],
    invocation: async (platform, channel, tags, message) => {

        if (platform === "twitch") {
            //if (!parent.functions.hasPerm(channel, tags.username.toLowerCase(), "hhb.compliment", true)) { return; }
            var command_args = message.split(/[\s]+/);

            if (command_args.length < 3) {
                parent.functions.twitch_clientsay(channel, ` @${tags.username} ${get_random_compliment()} ${random_aww_emote()} `);
                // parent.functions.getJSON("https://8768zwfurd.execute-api.us-east-1.amazonaws.com/v1/compliments", "", function (err, data) {
                //     if (err) {
                //         parent.functions.twitch_clientsay(channel, ` @${tags.username}, there was an error finding a compliment. Sorry! `);
                //     } else {
                //         parent.functions.twitch_clientsay(channel, ` @${tags.username}, ${data} `);
                //     }
                //     return;
                // }, 'GET')
            } else {
                if (command_args[2].toLowerCase() === "hannah_yee5") {
                    parent.functions.twitch_clientsay(channel, ` @${tags.username}, i'm not allowed to compliment myself FeelsBadMan  `);
                    return;
                }
                parent.functions.twitch_clientsay(channel, ` @${command_args[2].replace("@", "")} ${get_random_compliment()} ${random_aww_emote()} `);
                // parent.functions.getJSON("https://8768zwfurd.execute-api.us-east-1.amazonaws.com/v1/compliments", "", function (err, data) {
                //     if (err) {
                //         parent.functions.twitch_clientsay(channel, ` @${tags.username}, there was an error finding a compliment. Sorry! `);
                //     } else {
                //         parent.functions.twitch_clientsay(channel, ` @${command_args[2].replace("@", "")}, ${data.toLowerCase()} `);
                //     }
                //     return;
                // }, 'GET')
            }

            return

        } else if (platform === "discord") {
            //if (!parent.functions.hasPerm(channel, tags.author.id, "hhb.compliment", true, "discord",tags)) { return; }
            var command_args = message.split(/[\s]+/);

            if (command_args.length < 3) {
                parent.functions.getJSON("https://8768zwfurd.execute-api.us-east-1.amazonaws.com/v1/compliments", "", function (err, data) {
                    if (err) {
                        parent.functions.discord_clientsay(tags, `there was an error finding a compliment. Sorry! `, true);
                    } else {
                        parent.functions.discord_clientsay(tags, `${data} `, true);
                    }
                    return;
                }, 'GET')
            } else {
                parent.functions.getJSON("https://8768zwfurd.execute-api.us-east-1.amazonaws.com/v1/compliments", "", function (err, data) {
                    if (err) {
                        parent.functions.discord_clientsay(tags, `there was an error finding a compliment. Sorry! `, true);
                    } else {
                        parent.functions.discord_clientsay(tags, `${command_args[2]}, ${data.toLowerCase()} `, false);

                    }
                    return;
                }, 'GET')
            }

            return
        }
    }
}


function get_random_compliment() {
    compliments = [
        "Hey there sexy!",
        "I hope your day is as nice as your face!",
        "Have you been working out?",
        "I'm lucky to be your mirror!",
        "The Force is strong with you",
        "If I could high five you... I would!",
        "On a scale from 1 to 10, you're an 15!",
        "Being awesome is hard, but you'll manage",
        "I could just hang here all day!",
        "I need some time to reflect...",
        "I see a lot of myself in you",
        "Damn. You're looking good!",
        "Yes, you are the fairest of them all",
        "May the Force be with you",
        "There's no place like home",
        "There is no spoon...",
        "Temet Nosce",
        "Welcome to the desert of the real",
        "If you focus on what you’ve left behind, you will never be able to see what lies ahead",
        "I carried a watermelon",
        "You gotta hold the frame",
        "Never underestimate the power of denial",
        "Strangers all wanna sit next to you on the bus",
        "Coworkers fantasizes about getting stuck in the elevator with you",
        "At least two friends are going to name their child and/or goldfish after you",
        "You are freakishly good at thumb wars",
        "The FBI tapped your phone just to hear the sound of your voice",
        "You never forget to fill the ice-cube tray",
        "People enjoy you accidentally touching their butt while putting on your seat-belt",
        "I’d give you the last piece of my gum even if I’d just ate garlic",
        "You could make up a weird religion or diet and everyone would follow it",
        "Your principal would call you to the office just to look cool",
        "Your handshake conveys intelligence, confidence and minor claminess",
        "Cops admire your ability to stay a perfect 3-5 miles above the speed limit",
        "You rarely have to go to the bathroom when you fly in the window seat",
        "Cockroaches, mice and other pests avoid your place out of respect",
        "Callers are intimidated by how funny your voicemail greeting is",
        "Kids think you are the “cool old person”",
        "People always think your jeggings are regular jeans",
        "80% of motorcycle gangs think you’d be a delightful sidecar",
        "Everyone at the laundromat thinks you have the cutest underwear",
        "People behind you at movies think you are the perfect height",
        "Your parents argue over which one of them you look like",
        "Your smile is contagious",
        "You look great today",
        "You're a smart cookie",
        "I bet you make babies smile",
        "You have impeccable manners",
        "I like your style",
        "You have the best laugh",
        "I appreciate you",
        "You are the most perfect you there is",
        "Your perspective is refreshing",
        "You're an awesome friend",
        "You light up the room",
        "You deserve a hug right now",
        "You should be proud of yourself",
        "You're more helpful than you realize",
        "You have a great sense of humor",
        "You've got all the right moves!",
        "You're all that and a super-size bag of chips",
        "You're even more beautiful on the inside than you are on the outside",
        "If cartoon bluebirds were real, a bunch of them would be sitting on your shoulders singing right now",
        "You are making a difference",
        "You're like sunshine on a rainy day",
        "You bring out the best in other people",
        "Your ability to recall random factoids at just the right time is impressive",
        "You're a great listener",
        "How is it that you always look great, even in sweatpants?",
        "Everything would be better if more people were like you!",
        "I bet you sweat glitter",
        "You were cool way before hipsters were cool",
        "That color is perfect on you",
        "Hanging out with you is always a blast",
        "You smell really good",
        "Being around you makes everything better!",
        "When you say, \"I meant to do that,\" I totally believe you",
        "Colors seem brighter when you're around",
        "You're wonderful",
        "You have cute elbows. For reals!",
        "Jokes are funnier when you tell them",
        "You're better than a triple-scoop ice cream cone. With sprinkles",
        "Your bellybutton is kind of adorable",
        "Your hair looks stunning",
        "You're one of a kind!",
        "You're inspiring",
        "You should be thanked more often. So thank you!!",
        "You have the best ideas",
        "You always know how to find that silver lining",
        "Everyone gets knocked down sometimes, but you always get back up and keep going",
        "You're a candle in the darkness",
        "You're a great example to others",
        "Being around you is like being on a happy little vacation",
        "You always know just what to say",
        "You're always learning new things and trying to better yourself, which is awesome",
        "If someone based an Internet meme on you, it would have impeccable grammar",
        "You could survive a Zombie apocalypse",
        "You're more fun than bubble wrap",
        "When you make a mistake, you fix it",
        "Who raised you? They deserve a medal for a job well done",
        "You're great at figuring stuff out",
        "Your voice is magnificent",
        "The people you love are lucky to have you in their lives",
        "You're like a breath of fresh air",
        "You're gorgeous -- and that's the least interesting thing about you, too",
        "You're so thoughtful",
        "Your creative potential seems limitless",
        "Your name suits you to a T",
        "You're irresistible when you blush",
        "Actions speak louder than words, and yours tell an incredible story",
        "Somehow you make time stop and fly at the same time",
        "When you make up your mind about something, nothing stands in your way",
        "You seem to really know who you are",
        "Any team would be lucky to have you on it",
        "In high school I bet you were voted \"most likely to keep being awesome.\"",
        "Babies and small animals probably love you",
        "You're someone's reason to smile",
        "You're even better than a unicorn, because you're real",
        "How do you keep being so funny and making everyone laugh?",
        "You have a good head on your shoulders",
        "Has anyone ever told you that you have great posture?",
        "The way you treasure your loved ones is incredible",
        "You're really something special",
        "You're a gift to those around you",
        "You're so smart! Why haven't I thought of that before?",
        "You look great in that outfit",
        "You look younger than your age",
        "I like the way you smile",
        "You're so funny!",
        "Thank you for being so thoughtful",
        "Did you lose some weight? You look healthy",
        "I like you because you are a great listener",
        "You inspired me to become a better person",
        "I couldn't have finished this project without your help",
        "I like your sense of style",
        "Your hair looks amazing",
        "You smell good today",
        "You rock that shirt!",
        "Good job!",
        "I like your shoes",
        "I like the way you designed my website",
        "You have a lovely voice",
        "Your sweater looks nice. Where did you buy that?",
        "You cracked me up with that joke",
        "I love all of the photos you've taken",
        "You are a great husband",
        "That's so awesome!",
        "Have been working out lately?",
        "How do you style your hair like that?",
        "I like your pants",
        "I will recommend your service to my friends",
        "You must be the life of the party",
        "You look even better without makeup",
        "You have a great taste in clothes",
        "Take a break! You deserve a vacation",
        "How do make your skin to look flawless and radiant?",
        "Nice nails!",
        "You are one of a kind",
        "You look cool in those boots",
        "Keep up the good work!",
        "You nailed it!",
        "Those shoes were a great call. ",
        "9/10 dentists agree, you are the BEST",
        "Today's outfit = Thumbs up",
        "Your hair looks great today. It also looked really good two days ago",
        "You could be an astronaut if you wanted. NASA told me so",
        "Your dental hygiene is impeccable.  ",
        "8 out of 10 co-workers agree, your desk is the cleanest. ",
        "You'd be the last one standing in a horror movie",
        "You're funny. Like, LOL style",
        "You have very smooth hair",
        "You deserve a promotion",
        "I like your style",
        "That looks nice on you",
        "You have perfect bone structure",
        "I like your socks",
        "Your smile is breath taking",
        "You make my data circuits skip a beat",
        "You are the gravy to my mashed potatoes",
        "You're cooler than Pirates and Ninjas combined",
        "I like your pants",
        "You could probably lead a rebellion",
        "Your skin is radiant",
        "You could survive a zombie apocalypse",
        "You're so rad",
        "You're more fun than a barrel of monkeys",
        "You're nicer than a day on the beach",
        "Your glass is the fullest",
        "You look so perfect",
        "You're more fun than bubble wrap",
        "You're the bee's knees",
        "You definitely know the difference between your and you're",
        "Yum!, I dig you",
        "You got the moves like Jagger",
        "I would volunteer to take your place in the Hunger Games",
        "You have such nice eyes",
        "You're awesome",
        "You're the best",
        "You're fantastic",
        "You're really flipping smart",
        "You look awesome today, seriously"
    ]

    var index = Math.floor(Math.random() * compliments.length);

    picked = compliments[index];
    // change first letter to lowercase
    picked = picked.charAt(0).toLowerCase() + picked.slice(1);
    return picked;
}

function random_aww_emote(){
    var awws = ["swoonn", "SWOONER", "peepoAww", "peepoGiggle", "gigl" ]

    return awws[Math.floor(Math.random()*awws.length)];

}
