Plots <- function (dP,dN,dNe){ wordcloud2(dP, figPath = "C:/Users/aswin/Documents/git1125/Final_Project/Tweets/apple.jpg", size = 1,color = "blue")}
#wordcloud2(dN, figPath = "C:/Users/aswin/Documents/git1125/Final_Project/Tweets/apple.jpg", size = 1,color = "red")



Plots(dP,dN,dNe)
#print(input)
save("Plots", file="Plots.Rdata") 


