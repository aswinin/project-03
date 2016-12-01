library(gWidgets2)
options("guiToolkit"="tcltk")



w <- gwindow("Customer Perception Review - Apple (Nov 2016)")
fr <- gframe("Input Customer Reviews", horizontal=FALSE, cont=w) 
fl <- gformlayout(cont=fr)

select_file <- gfilebrowse(cont=fl, label="Select a .csv file: ")

bg <- ggroup(cont=fr)
addSpring(bg)
upload <- gbutton("Upload", cont=bg)


bg_Train <- ggroup(cont=fr)
addSpring(bg_Train)
Train <- gbutton("Train", cont=bg_Train)


bg_Predict <- ggroup(cont=fr)
addSpring(bg_Predict)
Predict <- gbutton("Predict", cont=bg)

## buttons
bg1 <- ggroup(cont=fr)
#addSpring(bg1)
Strengths <- gbutton("Strengths of Apple", cont=bg1)


bg2 <- ggroup(cont=fr)
#addSpring(bg2)
Opp <- gbutton("Opportunities to improve for Apple", cont=bg2)
 

bg3 <- ggroup(cont=fr)
#addSpring(bg3)
Percept <- gbutton("Overall Perception", cont=bg3)
 


addHandlerClicked(Train, function(h,...) {
load("ML_CART.Rdata")
Sentim2()
assign("tweetCARTP", tweetCARTP, envir = .GlobalEnv)
assign("tweetCARTN", tweetCARTN, envir = .GlobalEnv)
assign("tweetCARTNe", tweetCARTNe, envir = .GlobalEnv)
assign("tweets", input, envir = .GlobalEnv)
assign("cc", cc, envir = .GlobalEnv)
 })

addHandlerClicked(upload, function(h,...) {
  l <- svalue(select_file) 
  tweetsa = read.csv(l, stringsAsFactor = FALSE)
  assign("tweets1", tweetsa, envir = .GlobalEnv)

})



addHandlerClicked(Predict, function(h,...) {
load("Predict.Rdata")
Sentim(tweets1,tweets,cc)
assign("aafull", aafull, envir = .GlobalEnv)
assign("aa",aa, envir = .GlobalEnv)
assign("II", II, envir = .GlobalEnv)
 })


addHandlerClicked(Strengths, function(h,...) {
 assign("dP", dP, envir = .GlobalEnv)
 assign("dN", dN, envir = .GlobalEnv)
 assign("dNe", dNe, envir = .GlobalEnv)
load("Plots.Rdata")
Plots(dP,dN,dNe)
 })

addHandlerClicked(Opp, function(h,...) {
if (svalue(Opp)) {
wordcloud2(dN, figPath = "C:/Users/aswin/Documents/git1125/Final_Project/Tweets/apple.jpg", size = 1,color = "red")
png("Opportunities to Improve.png", width=1280,height=800)
}
 })
 
addHandlerClicked(percept, function(h,...) {
slices <- c(length(IIPos[,1]), length(IINeg[,1]), length(IINeu[,1])) 
lbls <- c("Positive", "Negative", "Neutral")
png("Pie", width=1280,height=800)
pie3D(slices,labels=lbls,explode=0.1,
  	main="Pie Chart of Countries ")
 })


visible(w)<- TRUE