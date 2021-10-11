const bookApp = {
    data() {
      return {
        books: [],
        }
    },
    computed: {
        
    },
    methods: {
        fetchBookData() {
            fetch('api/books/')
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.books = parsedJson;
                console.log("C");
            })
            .catch( err => {
                console.error(err)
            })

            console.log("B");
        }
    },
    created() {
        this.fetchBookData();
    }
  }
  
Vue.createApp(bookApp).mount('#booksApp');