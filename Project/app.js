// Welcome to Framer

// This is just demo code. Feel free to delete it all.
sketch = Framer.Importer.load("imported/synq-simple.sketch")

iphoneWidth = 375
iphoneHeight = 667
iphoneTitleHeight = 20
appTitleHeight = 60
calIconHeight = 50
personHeight = 60
calIconWidth = 50
inviteFormHeight = 300
inviteFormWidth = 300
mtX = iphoneWidth * 2 / 3 
mtWidth = iphoneWidth / 3 
mtY = iphoneTitleHeight + appTitleHeight
mtHeight = iphoneHeight - mtY
submtHeight = mtHeight / 4
calendarViewWidth = iphoneWidth - mtWidth

//Master Layer
iphoneLayer = new Layer({x:0, y:0, width:iphoneWidth, height:iphoneHeight})
iphoneLayer.center()

// iphone time placeholder and app title
iphoneTitle = new Layer({backgroundColor:"#ff4040", x:0, y:0, width: iphoneWidth, height:iphoneTitleHeight})
appTitle = new Layer({backgroundColor:"#20fa48", x: 0, y: iphoneTitleHeight, width: iphoneWidth, height: appTitleHeight})
appTitle.html = "<font size=\"5\"> Title </font>"
iphoneTitle.html = "<font size=\"3\"> Time </font>"
iphoneLayer.addSubLayer(iphoneTitle)
iphoneLayer.addSubLayer(appTitle)

// Set up ListViewController 
listLayer = new Layer({x:0, y: mtY, width: iphoneWidth, height: mtHeight})
iphoneLayer.addSubLayer(listLayer)

//Set up mutual time layer, CalendarView, and CalendarIcon
mtLayer = new Layer({backgroundColor: "#2DD7AA", x: mtX, y: mtY, width: mtWidth, height: mtHeight})
calendarView = new Layer({backgroundColor:"#8b0000", x: 0, y: mtY, width: calendarViewWidth, height: mtHeight})
calendarIcon = new Layer({backgroundColor:"#72ffc6", x: calendarViewWidth / 2 - calIconWidth / 2, y: mtHeight / 2 - calIconHeight / 2, width: calIconHeight, height: calIconHeight})
mtLayer.opacity = 0
calendarView.opacity = 0
calendarIcon.opacity = 0
calendarIcon.draggable.enabled = true
iphoneLayer.addSubLayer(mtLayer)
iphoneLayer.addSubLayer(calendarView)
iphoneLayer.addSubLayer(calendarIcon)

mt1 = new Layer({backgroundColor:"#ffff00", x:0, y: 0, width: mtWidth, height: submtHeight})
mt2 = new Layer({backgroundColor:"#ee7621", x:0, y: submtHeight, width: mtWidth, height: submtHeight})
mt3 = new Layer({backgroundColor:"#ffa07a", x:0, y: submtHeight * 2, width: mtWidth, height: submtHeight})
mt4 = new Layer({backgroundColor:"#ee8262", x:0, y: submtHeight * 3, width: mtWidth, height: submtHeight})

mtLayer.addSubLayer(mt1)
mtLayer.addSubLayer(mt2)
mtLayer.addSubLayer(mt3)
mtLayer.addSubLayer(mt4)

//Set up Invite form
inviteForm = new Layer({backgroundColor: Utils.randomColor(), x: 0, y: 0, width: inviteFormWidth, height: inviteFormHeight})
iphoneLayer.addSubLayer(inviteForm)
inviteForm.center()
inviteForm.sendToBack()

//Add Event Listener for CalendarIcon and invite form
inviteForm.on(Events.Click, function name (Events, layer) {
    inviteForm.sendToBack()
    calendarIcon.opacity = 0
    calendarView.opacity = 0
    mtLayer.opacity = 0
})

calendarIcon.on(Events.DragMove, function name(Events, layer) {
    if (calendarIcon.x > mtX && calendarIcon.y > mtY) {
	if (calendarIcon.y < submtHeight + mtY ) {
	    calendarView.backgroundColor = "#ffff00"
	} else if (calendarIcon.y > submtHeight + mtY && calendarIcon.y < submtHeight * 2 + mtY ){
	    calendarView.backgroundColor = "#ee7621"
	} else if (calendarIcon.y > submtHeight * 2 + mtY && calendarIcon.y < submtHeight * 3 + mtY ){
	    calendarView.backgroundColor = "#ffa07a"
	} else if (calendarIcon.y > submtHeight * 3) {
	    calendarView.backgroundColor = "#ee8262"
	}
    } else {
	calendarView.backgroundColor = "#8b0000"
    }
})

calendarIcon.on(Events.DragEnd, function name(event, layer) {
   if (calendarIcon.x > mtX && calendarIcon.y > mtY) {
       inviteForm.bringToFront()
       inviteForm.backgroundColor = Utils.randomColor()
    } else {
	calendarIcon.opacity = 0
	calendarView.opacity = 0
	mtLayer.opacity = 0
    }
})

person_counter = 0
for (i = 0; i < mtHeight; i += 60) {
    person = new Layer({backgroundColor: Utils.randomColor(), 
			x: 0, y: i, width: iphoneWidth, height: personHeight})
    person.html = "contact" + person_counter.toString()
    person.on(Events.TouchStart, function name(event, layer) {
	ispacex = event.x - Screen.width / 2 + iphoneWidth / 2
	ispacey = event.y - Screen.height / 2 + iphoneHeight / 2 
	mutualTime(event, ispacex, ispacey)
    })
    listLayer.addSubLayer(person)
    person_counter++
} 

//Set up mutual time layer
function mutualTime(event, eventx, eventy) {
    calendarIcon.x = eventx
    calendarIcon.y = eventy
    calendarIcon.draggable._touchStart(event)
    calendarIcon.opacity = 1
    calendarView.opacity = 1
    mtLayer.opacity = 1
}
//mutualtimeLayer = new Layer({x: 250 y: 0, width: 125, height: iphoneY})
//iphoneLayer.addSubLayer(mututaltimeLayer)

// Define a set of states with names (the original state is 'default')
//imageLayer.states.add({
//	second: {y:100, scale:0.6, rotationZ:100},
//	third:  {y:300, scale:1.3},
//	fourth:	{y:200, scale:0.9, rotationZ:200},
//})

// Set the default animation options
//imageLayer.states.animationOptions = {
//	curve: "spring(500,12,0)"
//}
//
//// On a click, go to the next state
//imageLayer.on(Events.Click, function() {
//	imageLayer.states.next()
//})
