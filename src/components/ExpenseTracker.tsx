import { ChangeEvent, Component, FormEvent } from "react";
import { pushDataFromUser } from '../services/main'

type Props = {
    onTrue: any
    onClose: any
}

type State = {
    product: string;
    price: number;
    payeeName: string;
    setDate: string;
}

class ExpenseTracker extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            product: "",
            price: 0,
            payeeName: "",
            setDate: this.setDefaultDate()
        }
        this.setpayee = this.setpayee.bind(this);
        this.setProduct = this.setProduct.bind(this);
        this.setProduct = this.setProduct.bind(this);
        this.setLoggedDate = this.setLoggedDate.bind(this);
    };

    setDefaultDate = () => {
        const today = new Date();

        return (
            today.getFullYear() + "-" + ("0" + today.getMonth() + 1).slice(-2)
            + "-" + ("0" + today.getDate()).slice(-2)
        )
    };


    setpayee = (event: any) => {
        this.setState({
            payeeName: event.target.value
          })
    };

    setProduct = (event: any) => {
        this.setState({
            product: event.target.value
          })
    };

    setPrice = (event: any) => {
        this.setState({
            price: parseInt(event.target.value)
          })
    };
    setLoggedDate = (event: any) => {
        this.setState({
            setDate: event.target.value
          })
    };

    submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const finalState = {
            ...this.state
        }
        const data = await pushDataFromUser(finalState);
        console.log(data);
        this.props.onTrue();

    };

    render() {
        const element = (
            <>
                <section>
                    <header>
                        <h1>Add new item</h1>
                        <p>
                            Read the below instructions before proceeding:
                            <br />
                            Make sure you fill all the fileds where * is provided
                        </p>
                    </header>
                    <form onSubmit={this.submitHandler}>
                    <article>
                        <p>Name</p>
                        <select
                            name="Name" id="district"
                            required value={this.state.payeeName}
                            onChange={this.setpayee}>
                            <option value="" defaultChecked>Choose</option>
                            <option value="Daman">Daman</option>
                            <option value="Naveen">Naveen</option>
                        </select>
                    </article>

                    <article>
                        <p>Product purchased</p>
                        <input
                            type="text"
                            required value={this.state.product}
                            onChange={this.setProduct} />
                    </article>

                    <article>
                        <p>Price</p>
                        <input
                            type="number"
                            required value={this.state.price}
                            onChange={this.setPrice} />
                    </article>

                    <article>
                        <p>Date</p>
                        <input
                            type="date"
                            required value={this.state.setDate}
                            onChange={this.setLoggedDate} />
                    </article>

                    <button
                        type="button" className="form-button"
                        onClick={this.props.onClose}>
                        Close
                    </button>

                    <button className="form-button">Submit</button>

                    </form>

                </section>
            </>
        )

        return element
    }
}

export default ExpenseTracker;


