import { useEffect, useRef, useState } from 'react';
import './Calculator.css';
import mainData from '../data/mainData';
import { operator, negation } from '../data/operations';

const Calculator = () => {
  // Layout
  const elementRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [bodyWidth, setBodyWidth] = useState(0)

  const setSquare = () => setHeight(elementRef.current.clientWidth);

  // Logical
  const main = mainData;

  const [formData, setFormData] = useState({
    value1: 0,
    value2: 0,
    sign: ""
  });
  const [count, setCount] = useState(0);

  const updateFields = (event) => {
    const {name, value} = event.target;

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  const updateInput = (value, type) => {
    if (type === "deletion") {
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          value1: 0,
          value2: 0,
          sign: "",
        }
      });
      setCount(0);
    } else if (type === "negation") {
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          value2: negation(formData.value2),
        }
      });
    } else if (type === "operator") {
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          value1: prevFormData.value1 === 0 ? prevFormData.value2 : operator(formData.value1, formData.value2, formData.sign),
          value2: 0,
          sign: value,
        }
      });
      setCount(0);
    } else if (type === "number") {
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          value2: prevFormData.value2 === 0 ? value : prevFormData.value2.toString() + value,
        }
      });
    } else if (type === "decimal") {
      setFormData(prevFormData => {
        return count === 0 ? {
          ...prevFormData,
          value2: prevFormData.value2 === 0 ? value : prevFormData.value2.toString() + value,
        } : {...prevFormData}
      });
      setCount(prevCount => prevCount+1);
    } else if (type === "submit") {
      formData.value1 > 0 ?
        setFormData(prevFormData => {
          return {
            ...prevFormData,
            value1: 0,
            sign: "",
            value2: operator(formData.value1, formData.value2, formData.sign),
          }
        })
        :
        setFormData(prevFormData => {
          return {
            ...prevFormData,
          }
        })
    } else {
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          value2: prevFormData.value2 === 0 ? Math.PI.toPrecision(6) : prevFormData.value2,
        }
      });
    }
  }

  const mainElements = main.map(element => {
    const { id, value, type } = element;

    return (
      <div 
        key={id} 
        ref={elementRef} 
        style={{height: height}}
        onClick={() => updateInput(value, type)}
      >
        <span>{value}</span>
      </div>
    );
  });

  useEffect(() => {
    setBodyWidth(window.innerWidth);
    setSquare();
    window.addEventListener("resize", () => setSquare());

    return _ => window.removeEventListener("resize", setSquare());
  }, [bodyWidth])

  return (
    <div className="calculator">
      <div className="header">
        <span>My Simple Calculator</span>
      </div>
      <div className="inputs">
        <div className="prevInput">
          <span>{formData.value1}{formData.sign === "" ? "" : formData.sign}</span>
        </div>
        <input
          name="value2"
          value={formData.value2}
          placeholder="0"
          onChange={updateFields}
          type="text"
          onKeyPress={e => e.preventDefault()}
        />
      </div>
      <div className="normal">
        {mainElements}
      </div>
    </div>
  )
}

export default Calculator;