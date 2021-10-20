const bookApp = {
    data() {
      return {
        books: [],
        bookForm:{}
        }
    },
    computed: {
        
    },
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
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
        },
        postNewBook(evt) { //event handler for form submission, event object is the default 
            //select the student id and add another offer into this student     
            console.log("Posting:", this.bookForm);
            alert("Posting!");
    
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.bookForm = {};
            });
        }
    },
    created() {
        this.fetchBookData();
    }
    
}

  
Vue.createApp(bookApp).mount('#booksApp');