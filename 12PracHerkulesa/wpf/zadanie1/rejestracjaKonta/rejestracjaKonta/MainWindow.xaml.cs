using System.Windows;
using System.Windows.Media;

namespace RejestracjaKonta
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        /*****************************************************
         nazwa funkcji:        btnZatwierdz_Click
         opis funkcji:         Sprawdza poprawność danych rejestracyjnych
                               (e-mail, długość hasła, zgodność haseł)
                               i wyświetla odpowiedni komunikat.
         parametry:            sender - obiekt wywołujący zdarzenie
                               e - argumenty zdarzenia
         zwracany typ i opis:  brak
         autor:                Dawid Nocinski
        *****************************************************/
        private void btnZatwierdz_Click(object sender, RoutedEventArgs e)
        {
            string email = txtEmail.Text.Trim();
            string haslo = txtHaslo.Password;
            string powtorzHaslo = txtPowtorzHaslo.Password;


            

            // 1. Sprawdzenie adresu e-mail
            if (!email.Contains("@"))
            {
                txtKomunikat.Text = "Nieprawidłowy adres e-mail";
                txtKomunikat.Foreground = Brushes.Red;
                return;
            }

            // 2. Sprawdzenie długości hasła
            if (haslo.Length < 6)
            {
                txtKomunikat.Text = "Hasło musi mieć co najmniej 6 znaków";
                txtKomunikat.Foreground = Brushes.Red;
                return;
            }

            // 3. Sprawdzenie zgodności haseł
            if (haslo != powtorzHaslo)
            {
                txtKomunikat.Text = "Hasła się różnią";
                txtKomunikat.Foreground = Brushes.Red;
                return;
            }

            // Dane poprawne
            txtKomunikat.Text = $"Witaj {email}";
            txtKomunikat.Foreground = Brushes.Green;

            // Czyszczenie pól haseł
            txtHaslo.Clear();
            txtPowtorzHaslo.Clear();
        }
    }
}