Sentim <- function (tweets1,tweets,cc){

str(tweets1)

summary(tweets1)

n=length(tweets1[,1])-1 
i=1
for (i in 1:n) {
    tweets[i,1]=tweets1[i,1]
}
myStopwords <- c(stopwords('english'), "available", "via", "apple","applebook","apples","neutral","stuff","stock","pay","use","iPhone","emoji","iPay","a's","able","about", "above","according","accordingly","across","actually", "after","afterwards","again","against","ain't", "all","allow","allows","almost","alone", "along","already","also","although","always", "am","among","amongst","an","and", "another","any","anybody","anyhow","anyone", "anything","anyway","anyways","anywhere","apart", "appear","appreciate","appropriate","are","aren't", "around","as","aside","ask","asking", "associated","at","available","away","awfully", "be","became","because","become","becomes", "becoming","been","before","beforehand","behind", "being","believe","below","beside","besides", "best","better","between","beyond","both", "brief","but","by","c'mon","c's", "came","can","can't","cannot","cant", "cause","causes","certain","certainly","changes", "clearly","co","com","come","comes", "concerning","consequently","consider","considering","contain", "containing","contains","corresponding","could","couldn't", "course","currently","definitely","described","despite", "did","didn't","different","do","does", "doesn't","doing","don't","done","down", "downwards","during","each","edu","eg", "eight","either","else","elsewhere","enough", "entirely","especially","et","etc","even", "ever","every","everybody","everyone","everything", "everywhere","ex","exactly","example","except", "far","few","fifth","first","five", "followed","following","follows","for","former", "formerly","forth","four","from","further", "furthermore","get","gets","getting","given", "gives","go","goes","going","gone", "got","gotten","greetings","had","hadn't", "happens","hardly","has","hasn't","have", "haven't","having","he","he's","hello", "help","hence","her","here","here's", "hereafter","hereby","herein","hereupon","hers", "herself","hi","him","himself","his", "hither","hopefully","how","howbeit","however", "i'd","i'll","i'm","i've","ie", "if","ignored","immediate","in","inasmuch", "inc","indeed","indicate","indicated","indicates", "inner","insofar","instead","into","inward", "is","isn't","it","it'd","it'll", "it's","its","itself","just","keep", "keeps","kept","know","known","knows", "last","lately","later","latter","latterly", "least","less","lest","let","let's", "like","liked","likely","little","look", "looking","looks","ltd","mainly","many", "may","maybe","me","mean","meanwhile", "merely","might","more","moreover","most", "mostly","much","must","my","myself", "name","namely","nd","near","nearly", "necessary","need","needs","neither","never", "nevertheless","new","next","nine","no", "nobody","non","none","noone","nor", "normally","not","nothing","novel","now", "nowhere","obviously","of","off","often", "oh","ok","okay","old","on", "once","one","ones","only","onto", "or","other","others","otherwise","ought", "our","ours","ourselves","out","outside", "over","overall","own","particular","particularly", "per","perhaps","placed","please","plus","possible","presumably","probably","provides","que", "quite","qv","rather","rd","re", "really","reasonably","regarding","regardless","regards", "relatively","respectively","right","said","same", "saw","say","saying","says","second", "secondly","see","seeing","seem","seemed", "seeming","seems","seen","self","selves", "sensible","sent","serious","seriously","seven", "several","shall","she","should","shouldn't", "since","six","so","some","somebody", "somehow","someone","something","sometime","sometimes", "somewhat","somewhere","soon","sorry","specified", "specify","specifying","still","sub","such", "sup","sure","ts","take","taken", "tell","tends","th","than","thank", "thanx","that","that's","thats", "the","their","theirs","them","themselves", "then","thence","there","there's","thereafter", "thereby","therefore","therein","theres","thereupon", "these","they","they'd","they'll","they're", "they've","think","third","this","thorough", "thoroughly","those","though","three","through", "throughout","thru","thus","to","together", "too","took","toward","towards","tried","tries","truly","try","trying","twice","two","un","under","unfortunately","unless", "unlikely","until","unto","up","upon", "us","use","used","useful","uses", "using","usually","value","various","very", "via","viz","vs","want","wants", "was","wasn't","way","we","we'd", "we'll","we're","we've","welcome","well", "went","were","weren't","what","what's", "whatever","when","whence","whenever","where", "where's","whereafter","whereas","whereby","wherein", "whereupon","wherever","whether","which","while", "whither","who","who's","whoever","whole", "whom","whose","why","will","willing", "wish","with","within","without","won't", "wonder","would","wouldn't","yes","yet", "you","you'd","you'll","you're","you've", "your","yours","yourself","yourselves","zero","appl","make","amp","dont","fix","yall","google","happen","guys","hey","hook","life","microsoft")

tweets$Negative = as.factor(tweets$Avg <= -1)

#filter the Positive tweets with an averge score >= 1

tweets$Positive = as.factor(tweets$Avg >= 1)

#filter the Neutraltweets with an averge score ==0

tweets$Neutral = as.factor(tweets$Avg == 0)

#diplay the table 

table(tweets$Negative)
table(tweets$Positive)
table(tweets$Neutral)

corpus1 = Corpus(VectorSource(tweets$Tweet))

#use tm_map function is tm library to convert all the tweets to lowercase - 
#STEP1 in cleaning
corpus1 = tm_map(corpus1, tolower)

#cleaning step2- remove punctuation

corpus1 = tm_map(corpus1, removePunctuation)



for (i in 1:length(corpus1)){
x <- corpus1[[i]]
corpus1[[i]]="0"
bb<-head(strsplit(x, split = "\ "), 10)
dd<-unlist(bb)
for (j in 0:length(dd)){
y <- any(cc==dd[j])
if (y=="TRUE") dd[j]=dd[j] else dd[j]=""
}
corpus1[[i]]<-paste(dd,collapse=' ')
}

corpus1 = tm_map(corpus1, stemDocument)

corpus1 = tm_map(corpus, removeWords, myStopwords)


#convert the corpus into PlainTextDocument for the subsequent steps to works. if this command is missing, then the frequencies command is not working! 

corpus1 <- tm_map(corpus1, PlainTextDocument)

frequencies1 = DocumentTermMatrix(corpus1)

# this function basically displays words that appear a few times. If the num of words are apppearing less frequenctly, then the predictive power is very low

#create a sparse matrix, assigning this to 'sparse'

#0.995 threshold points out to keep words that appear 0.5% of the tweets, and the remove others.

sparse1 = removeSparseTerms(frequencies1, 0.995)

#create tweetSparse dataframe:
#as.data.frame and as.matrix are two functions

tweetsSparse1 = as.data.frame(as.matrix(sparse1))



#this function assign the proper col names even if the text is starting from the number in the col, this command is critical to use during any text analytic problem.

colnames(tweetsSparse1) = make.names(colnames(tweetsSparse1))

#assign negative variable to the sparse matrix, same as the original tweet data

tweetsSparse1$Negative = tweets$Negative
tweetsSparse1$Positive = tweets$Positive
tweetsSparse1$Neutral = tweets$Neutral

#split the data into test and train
#uses caTools lib

split1 = sample.split(tweetsSparse1$Negative, SplitRatio=0)
trainSparse1 = subset(tweetsSparse1, split1==TRUE)
testSparse1 = subset(tweetsSparse1, split1==FALSE)

#predict the model using predict function
predictCARTN1 = predict(tweetCARTN, newdata=tweetsSparse1, type="class")
predictCARTP1 = predict(tweetCARTP, newdata=tweetsSparse1, type="class")
predictCARTNe1 = predict(tweetCARTNe, newdata=tweetsSparse1, type="class")

#create confusion matrix

table(tweetsSparse1$Negative, predictCARTN1)
table(tweetsSparse1$Positive, predictCARTP1)
table(tweetsSparse1$Neutral, predictCARTNe1)

#create a baseline table 
table(tweetsSparse1$Negative)
table(tweetsSparse1$Positive)
table(tweetsSparse1$Neutral)

n=length(tweets1[,1])-1
n2=2*n 


aa <- matrix(1:n2, ncol = 2)

Pos <- matrix(1:n, ncol = 1)
Neg <- matrix(1:n, ncol = 1)
Neu <- matrix(1:n, ncol = 1)

i=1
for (i in 1:n) {
 aa[i,1]<-tweets1[i,1]
  if (predictCARTN1[[i]]=="TRUE")
   aa[i,2]= "Negative"
  

  if (predictCARTP1[[i]]=="TRUE")
   aa[i,2]= "Positive"
  
  if (predictCARTNe1[[i]]=="TRUE")
   aa[i,2]= "Neutral"

}

m=(length(tweets[,1]))-1
m2=2*m
aafull<- matrix(1:m2-3, ncol = 2)
i=1
for (i in 1:(m-3)) {
 aafull[i,1]<-tweets[i,1]
  if (predictCARTN1[[i]]=="TRUE")
   aafull[i,2]= "Negative"
  
  if (predictCARTP1[[i]]=="TRUE")
   aafull[i,2]= "Positive"
  
  if (predictCARTNe1[[i]]=="TRUE")
   aafull[i,2]= "Neutral"
}



II=as.data.frame(as.matrix(aafull))

IIPos <- II[ which(II$V2=='Positive'),] 


IINeg <- II[ which(II$V2=='Negative'),] 


IINeu <- II[ which(II$V2=='Neutral'),] 


corpusP = Corpus(VectorSource(IIPos$V1))
corpusP = tm_map(corpusP, tolower)
corpusP = tm_map(corpusP, removePunctuation)
myStopwords1 <- c(stopwords('english'), "available", "via", "apple","apples","appl","neutral","stuff","stock","pay","use","a's","able","about", "above","according","accordingly","across","actually", "after","afterwards","again","against","ain't", "all","allow","allows","almost","alone", "along","already","also","although","always", "am","among","amongst","an","and", "another","any","anybody","anyhow","anyone", "anything","anyway","anyways","anywhere","apart", "appear","appreciate","appropriate","are","aren't", "around","as","aside","ask","asking", "associated","at","available","away","awfully", "be","became","because","become","becomes","becoming","been","before","beforehand","behind", "being","believe","below","beside","besides", "best","better","between","beyond","both", "brief","but","by","c'mon","c's", "came","can","can't","cannot","cant", "cause","causes","certain","certainly","changes", "clearly","co","com","come","comes", "concerning","consequently","consider","considering","contain", "containing","contains","corresponding","could","couldn't", "course","currently","definitely","described","despite", "did","didn't","different","do","does", "doesn't","doing","don't","done","down", "downwards","during","each","edu","eg", "eight","either","else","elsewhere","enough", "entirely","especially","et","etc","even", "ever","every","everybody","everyone","everything", "everywhere","ex","exactly","example","except", "far","few","fifth","first","five", "followed","following","follows","for","former", "formerly","forth","four","from","further", "furthermore","get","gets","getting","given", "gives","go","goes","going","gone", "got","gotten","greetings","had","hadn't", "happens","hardly","has","hasn't","have", "haven't","having","he","he's","hello", "help","hence","her","here","here's", "hereafter","hereby","herein","hereupon","hers", "herself","hi","him","himself","his","hither","hopefully","how","howbeit","however","i'd","i'll","i'm","i've","ie","if","ignored","immediate","in","inasmuch", "inc","indeed","indicate","indicated","indicates", "inner","insofar","instead","into","inward", "is","isn't","it","it'd","it'll", "it's","its","itself","just","keep", "keeps","kept","know","known","knows", "last","lately","later","latter","latterly", "least","less","lest","let","let's", "like","liked","likely","little","look", "looking","looks","ltd","mainly","many", "may","maybe","me","mean","meanwhile","merely","might","more","moreover","most", "mostly","much","must","my","myself", "name","namely","nd","near","nearly", "necessary","need","needs","neither","never", "nevertheless","new","next","nine","no", "nobody","non","none","noone","nor", "normally","not","nothing","novel","now", "nowhere","obviously","of","off","often", "oh","ok","okay","old","on","once","one","ones","only","onto", "or","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","own","particular","particularly", "per","perhaps","placed","please","plus", "possible","presumably","probably","provides","que", "quite","qv","rather","rd","re", "really","reasonably","regarding","regardless","regards", "relatively","respectively","right","said","same", "saw","say","saying","says","second", "secondly","see","seeing","seem","seemed","seeming","seems","seen","self","selves", "sensible","sent","serious","seriously","seven", "several","shall","she","should","shouldn't","since","six","so","some","somebody", "somehow","someone","something","sometime","sometimes", "somewhat","somewhere","soon","sorry","specified", "specify","specifying","still","sub","such", "sup","sure","ts","take","taken","tell","tends","th","than","thank","thanx","that","that's","thats","the","their","theirs","them","themselves", "then","thence","there","there's","thereafter", "thereby","therefore","therein","theres","thereupon","these","they","they'd","they'll","they're", "they've","think","third","this","thorough", "thoroughly","those","though","three","through", "throughout","thru","thus","to","together", "too","took","toward","towards","tried","tries","truly","try","trying","twice", "two","un","under","unfortunately","unless", "unlikely","until","unto","up","upon", "us","use","used","useful","uses", "using","usually","value","various","very", "via","viz","vs","want","wants", "was","wasn't","way","we","we'd", "we'll","we're","we've","welcome","well", "went","were","weren't","what","what's", "whatever","when","whence","whenever","where", "where's","whereafter","whereas","whereby","wherein", "whereupon","wherever","whether","which","while", "whither","who","who's","whoever","whole", "whom","whose","why","will","willing", "wish","with","within","without","won't", "wonder","would","wouldn't","yes","yet", "you","you'd","you'll","you're","you've", "your","yours","yourself","yourselves","zero","appl","make","amp","dont","fix","thanks","yall","google","happen","flaw","guys","hey","hook","alertbots","bad","bar","bought","cashback","contest","microsoft")
corpusP = tm_map(corpusP, stemDocument)
corpusP = tm_map(corpusP, removeWords, myStopwords1)
corpusP <- tm_map(corpusP, PlainTextDocument)

frequenciesP = DocumentTermMatrix(corpusP)

corpusN = Corpus(VectorSource(IINeg$V1))

#use tm_map function is tm library to convert all the tweets to lowercase - 
#STEP1 in cleaning
corpusN = tm_map(corpusN, tolower)

#cleaning step2- remove punctuation

corpusN = tm_map(corpusN, removePunctuation)
corpusN = tm_map(corpusN, stemDocument)

corpusN = tm_map(corpusN, removeWords, myStopwords1)


corpusN <- tm_map(corpusN, PlainTextDocument)

frequenciesN = DocumentTermMatrix(corpusN)

corpusNe = Corpus(VectorSource(IINeu$V1))

#use tm_map function is tm library to convert all the tweets to lowercase - 
#STEP1 in cleaning
corpusNe = tm_map(corpusNe, tolower)

#cleaning step2- remove punctuation

corpusNe = tm_map(corpusNe, removePunctuation)
corpusNe = tm_map(corpusNe, stemDocument)

corpusNe = tm_map(corpusNe, removeWords, myStopwords1)


corpusNe <- tm_map(corpusNe, PlainTextDocument)

frequenciesNe = DocumentTermMatrix(corpusNe)


myDtmP <- TermDocumentMatrix(corpusP, control = list(minWordLength = 1))
mP <- as.matrix(myDtmP)
 # calculate the frequency of words
 vP <- sort(rowSums(mP), decreasing=TRUE)
myNamesP <- names(vP)

text <- matrix(1:length(vP), ncol = 1)
size <- matrix(1:length(vP), ncol = 1)

for (i in 1:(length(vP))){
if (vP[[i]]>=2)
 text[i]=myNamesP[i] 
if (vP[[i]]>=2)
size[i]=2*vP[[i]]
if (vP[[i]]<2) 
text[i]=""
if (vP[[i]]<2) 
  size[i]="" 
}

 dP <- data.frame(text, size)
 dP<-dP[!(dP$text=="" & dP$size==""),]


myDtmN <- TermDocumentMatrix(corpusN, control = list(minWordLength = 1))
mN <- as.matrix(myDtmN)
 # calculate the frequency of words
 vN <- sort(rowSums(mN), decreasing=TRUE)
myNamesN <- names(vN)

text <- matrix(1:length(vN), ncol = 1)
size <- matrix(1:length(vN), ncol = 1)

for (i in 1:(length(vN))){
if (vN[[i]]>=2)
 text[i]=myNamesN[i] 
if (vN[[i]]>=2)
size[i]=2*vN[[i]]
if (vN[[i]]<2) 
text[i]=""
if (vN[[i]]<2) 
  size[i]="" 
}

 dN <- data.frame(text, size)
 dN<-dN[!(dN$text=="" & dN$size==""),]




myDtmNe <- TermDocumentMatrix(corpusNe, control = list(minWordLength = 1))
mNe <- as.matrix(myDtmNe)
 # calculate the frequency of words
 vNe <- sort(rowSums(mNe), decreasing=TRUE)
myNamesNe <- names(vNe)

text <- matrix(1:length(vNe), ncol = 1)
size <- matrix(1:length(vNe), ncol = 1)

for (i in 1:(length(vNe))){
if (vNe[[i]]>=2)
 text[i]=myNamesNe[i] 
if (vNe[[i]]>=2)
size[i]=2*vNe[[i]]
if (vNe[[i]]<2) 
text[i]=""
if (vNe[[i]]<2) 
  size[i]="" 
}

 dNe <- data.frame(text, size)
 dNe<-dNe[!(dNe$text=="" & dNe$size==""),]

dP[, 2] <- as.numeric(as.character( dP[, 2] ))
dN[, 2] <- as.numeric(as.character( dN[, 2] ))
dN[, 2] <- as.numeric(as.character( dN[, 2] ))


 assign("dP", dP, envir = .GlobalEnv)
 assign("dN", dN, envir = .GlobalEnv)
 assign("dNe", dNe, envir = .GlobalEnv)

install.packages("wordcloud2")
library(wordcloud2)
wordcloud2(dP, figPath = "C:/Users/aswin/Documents/git1125/Final_Project/Tweets/apple.jpg", size = 1,color = "blue")
wordcloud2(dN, figPath = "C:/Users/aswin/Documents/git1125/Final_Project/Tweets/apple.jpg", size = 1,color = "red")

}


Sentim(tweets1,tweets)
save("Sentim", file="Predict.Rdata") 
