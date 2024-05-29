# Singapore Residential Property Price Trend - Housing Resale Price Insight

## Overview

This web app offers comprehensive insights into the Singapore residential property resale market. Accompanied by search autocompletion, users can search for public housing transactions by street and postal code, gaining access to detailed transaction data and charts. Information is provided based on location, flat size, storey, area, and transaction price. The aim is to help users understand market trends and make informed decisions.

### Live URL

[Discover Housing Resale Price Insight](https://housing.creaturexd.com)

### Key Features

- **Search Autocompletion**: Quickly find properties by street or postal code with ease.
- **Detailed Transaction Data**: View comprehensive details about each transaction, including flat size, storey, and area.
- **Interactive Charts**: Visualize market trends and data through intuitive charts.
- **Personal Tracking List**: Track transactions by adding them to a personal list for future reference. Users can also create their own offer/target prices based on location, size, and price for comparison.
- **Interactive Map**: View the surrounding area of the searched location on a map for better context and understanding.
- **External Property Links**: Navigate easily to external websites to explore currently available properties.
- **Dark Mode**: Enjoy a sleek, auto dark mode that's easy on the eyes, especially in low-light environments.
- **Responsive and Adaptive Design**: Experience a seamless interface on both mobile and desktop devices, ensuring usability and accessibility.

This app is designed to provide valuable market insights and assist users in navigating the property resale landscape in Singapore.

### Components

```mermaid
classDiagram
  direction BT
  class App {
    Chakra
    SharedDataProvider
    Router(ResalePage, ResaleListPage)
  }

class main {
    Router(App)
  }

class SharedData {
    createContext
    useState[resaleList, setResaleList]
    useState[addList, setAddList]
    useState[offerList, setOfferList]
  }
  note for SharedData "Fetch offerList and resaleList from api"

class ResalePage {
    useContext[ addList ]
    useState[resales, setResale]
    useState[search, setSearch]
    useDisclosure[ isOpen, onOpen, onClose ]
  }
  note for ResalePage "Fetch Transaction List from api"

class ResaleTable {
    Show (props)
  }
  note for ResaleTable "props = { resales, addResale, addList }"

class SearchBar {
  useState[resales, setResale]
  useState[search, setSearch]
}
note for SearchBar "props = { search, onSearchSubmit }"
note for SearchBar "Fetch Address Data from api"

class ReplaceWords {
  Replace (props)
}
note for ReplaceWords "props = { selectedAddress }"

class OpenMap {
  Show (props)
}
note for OpenMap "props = { search }"
note for OpenMap "Fetch Map Data from api"

class ResaleChart {
    Show (props)

}
note for ResaleChart "props = { resales }"

class ExtLink {
    Show (props)

}
note for ExtLink "props = { town, street }"

class ResaleListPage {
    useContext[ resaleList, offerList, fetchResaleList, fetchOfferList ]
  }

class OfferData {
    useState[selectedResale, setSelectedResale]
    useDisclosure[ isOpen, onOpen, onClose ]
  }
  note for OfferData "props = { offerList, delOffer, editOffer }"

class EditOfferModal {
    useState[offerForm, setOfferForm]
  }
  note for EditOfferModal "props = { isOpen, onClose, editOffer, delOffer, resale }"

class AddOfferModal  {
    useState[offerForm, setOfferForm]
  }
  note for AddOfferModal "props = { isOpen, onClose, addOffer }"

class ResaleData {
    Show (props)
  }
  note for ResaleData "props = { resaleList, delResale, cloneResale }"


  App *-- main
ResalePage *-- App
SharedData --* App
SharedData --* ResalePage
SharedData --* ResaleListPage
ResaleTable *-- ResalePage
SearchBar *-- ResalePage
ReplaceWords *-- SearchBar
OpenMap *-- ResalePage
ResaleTable *-- ReplaceWords
OpenMap *-- SearchBar
ResaleData *-- ResaleTable
ResaleListPage *-- App
OfferData *-- ResaleListPage
OfferData *-- ResaleData
ResaleData *-- ResaleListPage
EditOfferModal *-- OfferData
AddOfferModal *-- OfferData
ExtLink *-- ResaleTable
ResaleChart *-- ResalePage
ResaleChart *-- SearchBar



```

## Technology and Deployment

- **Vite React**: development environment for React.
- **Leaflet**: library for interactive maps.
- **Chakra UI**: component library for building user interfaces.
- **Chart.js**: JavaScript charting library for creating responsive and interactive charts.

### Setup Instructions

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory and install dependencies:
   ```bash
   cd <project-directory>
   npm install
   ```
3. Start the development server by running:
   ```bash
   npm run dev
   ```
4. For cloud deployment (e.g., AWS), build the project with:
   ```bash
   npm run build
   ```

## Resources and References

- **Onemap**: Singapore's authoritative national map resource.
- **Data.gov.sg**: Singapore's open data platform providing publicly available datasets.

The current dataset includes transactions from the current month of the year, dating back to 2007. Transaction price data are sourced from the Housing & Development Board's resale transactions dataset.
