import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
function DefaultLayout({children}) {
    return (
        <div>
            {/*wrapper*/}
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
