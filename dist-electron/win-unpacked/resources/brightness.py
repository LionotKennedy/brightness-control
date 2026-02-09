import screen_brightness_control as sbc
import sys

print("=== Controleur de Luminosite ===")

if len(sys.argv) > 1:
    arg = sys.argv[1]
    try:
        # Vérifier si l'argument commence par + ou -
        if arg.startswith('+') or arg.startswith('-'):
            # C'est un incrément
            current = sbc.get_brightness()[0]  # On prend la première valeur de la liste
            change = int(arg)
            new_brightness = current + change
            # S'assurer que la valeur reste entre 0 et 100
            if new_brightness < 0:
                new_brightness = 0
            elif new_brightness > 100:
                new_brightness = 100
            sbc.set_brightness(new_brightness)
            print(f"[OK] Luminosite reglee a {new_brightness}%")
        else:
            # Sinon, c'est une valeur absolue
            valeur = int(arg)
            if 0 <= valeur <= 100:
                sbc.set_brightness(valeur)
                print(f"[OK] Luminosite reglee a {valeur}%")
            else:
                print("[ERREUR] Valeur doit etre entre 0 et 100")
    except ValueError:
        print("[ERREUR] Entrez un nombre (ex: 50, 75, +10, -10)")
else:
    # Mode : afficher la luminosité actuelle
    current = sbc.get_brightness()
    print(f"Luminosite actuelle : {current}%")
    print("\nUtilisation :")
    print("  python brightness.py 50   (pour 50%)")
    print("  python brightness.py +10  (augmenter de 10%)")
    print("  python brightness.py -10  (diminuer de 10%)")