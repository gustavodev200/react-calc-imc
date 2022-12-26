import { useState } from "react";
import styles from "./App.module.css";

import { levels, calculateImc, LevelProps } from "./helpers/imc";

import poweredImage from "./assets/powered.png";
import leftArrowImage from "./assets/leftarrow.png";

import { GridItem } from "./components/GridItem";

function App() {
  const [heightFiled, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<LevelProps | null>(null);

  const handleCalculateButton = () => {
    if (heightFiled && weightField) {
      setToShow(calculateImc(heightFiled, weightField));
    } else {
      alert("Digite todos os campos.");
    }
  };

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  };

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="Application logo" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>
            IMC é a sigla para Índice de Massa Corpórea, parâmetro adotodato
            pela Organizção Mundial de Saúde para calcular o peso ideal de cada
            pessoa.
          </p>

          <input
            type="number"
            placeholder="Digite a sua altura. Ex: 1.5 (em métros)"
            value={heightFiled > 0 ? heightFiled : ""}
            onChange={(e) => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <input
            type="number"
            placeholder="Digite o seu peso. Ex: 75.3 (em kg)"
            value={weightField > 0 ? weightField : ""}
            onChange={(e) => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button
            onClick={handleCalculateButton}
            disabled={toShow ? true : false}
          >
            Calculate
          </button>
        </div>
        <div className={styles.rightSide}>
          {!toShow && (
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          )}
          {toShow && (
            <div className={styles.righBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="Seta flutuante" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
