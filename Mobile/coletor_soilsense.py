import serial, json, sys
from datetime import datetime

PORTA = "COM8"       # Mude para COM4, etc, se necessário
BAUD  = 115200
ARQ   = "soilsense.jsonl"

def main():
    try:
        ser = serial.Serial(PORTA, BAUD, timeout=2)
        print(f"Lendo {PORTA}. Salvando em {ARQ}. Ctrl+C para parar.")
    except Exception as e:
        print("Erro abrindo porta:", e)
        sys.exit(1)

    with open(ARQ, "a", encoding="utf-8") as f:
        try:
            while True:
                linha = ser.readline().decode("utf-8", errors="ignore").strip()
                if not linha:
                    continue
                try:
                    obj = json.loads(linha)
                except json.JSONDecodeError:
                    print("Ignorando linha inválida:", linha)
                    continue

                obj["_host_ts"] = datetime.now().isoformat()
                f.write(json.dumps(obj, ensure_ascii=False) + "\n")
                f.flush()
                print(obj)
        except KeyboardInterrupt:
            print("\nParando.")
        finally:
            ser.close()

if __name__ == "__main__":
    main()
