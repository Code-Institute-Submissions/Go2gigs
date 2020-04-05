<h1 align="center">Go2Gigs</h1>
![Gig Image](assets/images/gig2.jpg)

This website will allow users to search for their favorite gigs by searching by location or by artist.
The website will provide a simple to use search facility where users can enter their city and receive a list of local gigs
including the date and specific location of those gigs. Users can also search by an artist name where they will receive the related gig location and date. 

The **Go2Gigs** website displays search results in a data table with an accompanying **Google map** where users can find specific gig location information.
Users can interact with the information by selecting a button in the data table which will zoom the **Google** map to the location of that gig.
User can select another button which will open a **Youtube** playlist for that specific artist.
In this way the **Go2Gigs** website can be used to find new music which is of interest to the user by allowing users to find music in their area and to 
listen to a playlist to see if they would like to go to that gig.

## UX
### User Stories
As a user I want to easily search for local gigs in my city.
When I enter my city I want to be presented with concise information related to gigs in my city with artist name,
gig specific location and gig date.

As a user I want to search for my favourite artist and be presented with gig specific location and dates for that artist. 

As a user once I find a specific gig to attend I want to easily purchase tickets to that gig.

As a user if my favourite artist is not currently arranged to play in my city then I would like to setup an alert.
This alert will notify me via mobile phone when my favourite artist has arranged a gig in my city.

As a target user in the age range of 18 to 50 I expect that gig information is presented to me in a simple but exciting and
eye catching way. I want to feel a sample of the high energy and excitement of being at a gig while using the website.

### Strategy
The Go 2 Gigs website will provide users with an easy to use way of searching for events either by searching for their favourite artist or by searching in their city.

Users will be presented with gig information in a table ordered by date. Users can filter the data in the table for more specific information by using the table search bar.

Users will also be presented with a **Google** map with markers at the position of each event in the results table.

For each search result the user will also have 2 buttons in the table which will provide a way for the user to interact with the data and provides a more user led experience;

* Find button; once clicked the **Google** map will zoom into the exact location of that event
* Play button; once clicked a modal will open which contains a **YouTube** playlist for that event artist

This website will be aimed at a range of demographics from junior music fans aged 12 to 18, senior music fans 18 to 50. 
As a result of this wide range of users the site must be simple to use and laid out in a concise manner.

### Scope
Website key features include the following;

* Gig search form - provides users with a means of searching for gigs
    * Drop down menu to allow users to search by city or search by artist
    * User input element where users will input the artist name or city
    * User input element will use **Google autocomplete API** to autocomplete the city name as the user inputs this information
    * Date from element where users will select the beginning search date range
    * Date to element where users will select the ending search date range

* Results Section - provides the user with search results in a data table and **Google map**
    * Data table which displays gig information
    * Gig information displayed is; event date, artist name, city, venue, find button and play button
    * Find button which zooms the **Google map** to that specific location
    * Play button which plays a **YouTube** playlist for that artist in a modal
    * **Google map** which displays event locations with **Google markers**

* Footer Section - provides links to **Go2Gigs** social media pages and the songkick affiliate page

### Structure
I want to keep the site as minimalist and clutter free as possible so that it is easy to use for the wide ranging demographic and so users are not overwhelmed with information.
Information will be provided to users in a concise, straight forward manner.

The mobile first design will arrange information in single full width columns to allow content to be read easily.
On larger tablet and desktop display information will be arranged in additional columns using Bootstraps responsive grid design.

Information will be grouped in 3 key areas;
* Home - provides an eye catching background gig image with a simple, clutter free search form
* Results table - provides key gig information regarding dates, artist name, location, find and play features
* Results map - provides a **Google map** with gig venue locations at specific markers

### Surface
I want the colors used on the site to mimic the colors of the gig background image and to provide the user with the feel of being at a gig venue.
The perspective of the image provides the user with the sense of being in the crowd at a gig.
An opaque overlay has been used on the full background image to add to the venue feeling.

The primary colours for the website are black and a contrasting white to dispay information in the results section.
A secondary blue highlight color #0066cc has then been used to make key elements stand out on the page and to grab the attention of the user.
These primary and secondary colors mirror the colors of the gig full background image.

I have used Lato font throughout the website as it has a simplistic style.
I have used Roboto font for the main page heading as this font makes the heading stand out and grabs the users attention.

### Wireframes
![Wireframe Desktop 1](/wireframes/Go2GigsDesktop1.png)
![Wireframe Desktop 2](/wireframes/Go2GigsDesktop2.png)
![Wireframe Mobile 1](/wireframes/Go2GigsMobile1.png)
![Wireframe Mobile 2](/wireframes/Go2GigsMobile2.png)
![Wireframe Tablet 1](/wireframes/Go2GigsTablet1.png)
![Wireframe Tablet 2](/wireframes/Go2GigsTablet2.png)

### Features to implement
Future features will include a sign up and log in section where a user could then add their favourite bands to track in their local city.
Once the band has scheduled a gig in that city the user could then receive an email or text notification.

### Technologies used
1. HTML
2. CSS
3. Javascript
4. [Bootstrap](https://getbootstrap.com/)
5. [Googel Fonts](https://fonts.google.com/)
6. [Font Awesome](https://fontawesome.com/)
7. [Auto Prefixer](https://autoprefixer.github.io/)
8. [JQuery](https://jquery.com/)
9. [Popper.js](https://popper.js.org/)
10. [Google API](https://developers.google.com/)
11. [YouTube API](https://developers.google.com/youtube/v3)
12. [Songkick API](https://www.songkick.com/developer)
13. [Bootstrap datepicker](https://github.com/uxsolutions/bootstrap-datepicker)
14. [Bootstrap table](https://bootstrap-table.com/)
15. [Google Fonts](https://fonts.google.com/)

## Testing
Please see the TEST.md file at this link [TEST.md](TEST.md) to understand how the **Go2Gigs** website was tested.

## Deployment
This project was developed using the GitPod IDE, version controlled by committing to git and pushing to GitHub via the GitPod IDE.
To deploy this page to GitHub pages from its specific [GitHub repository](https://github.com/Conal84/Go2gigs) the steps followed were;

1. Scroll to the top of this GitHub page
2. In the Repositories list select **Go2gigs**
3. From the menu select **Settings**
4. Scroll down to the **GitHub Pages** section
5. Under Source select **Master branch**
6. On selecting Master branch the page is automatically refreshed, the website is now deployed
7. The link to the webpage can be found at the top of the GitHub Pages section

### How to run this project locally
To clone this project from GitHub:

1. Follow this link to the Project [GitHub repository](https://github.com/Conal84/Go2gigs)
2. Under the repository name, click **Clone or download**
3. In the Clone with HTTPs section, copy the clone URL for the repository
4. In your local IDE open the terminal
5. Change the current working directory to the location where you want the cloned directory to be made
6. Type git clone, and then paste the URL you copied in Step 3
7. Press **Enter** your local clone will be created

## Acknowledgements
I would like to thank my mentor Simen for his valuable advice and guidance throughout the project.

**This is for educational use**
