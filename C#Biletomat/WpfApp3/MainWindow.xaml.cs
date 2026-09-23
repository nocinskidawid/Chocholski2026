using System.Diagnostics.Eventing.Reader;
using System.Reflection.Metadata;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WpfApp3
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Random random = new Random();
            var bc = new BrushConverter();
            int randomNumber = random.Next(1,10);

            if (randomNumber >= 1 && randomNumber < 3)
            {
                SuperUltraGigaMainWindow.Background = (Brush)bc.ConvertFrom("#FF0000");
            }
            else if (randomNumber >= 4 && randomNumber < 6)
            {
                SuperUltraGigaMainWindow.Background = (Brush)bc.ConvertFrom("#008000");
            }
            else if (randomNumber >= 7 && randomNumber < 9)
            {
                SuperUltraGigaMainWindow.Background = (Brush)bc.ConvertFrom("#000080");
            }
        }

        static decimal CenaBazowa(string Taryfa)
        {
            decimal baza = 0;
            if (Taryfa == "System.Windows.Controls.ComboBoxItem: 20 min")
            {
                baza = 4.0m;
            }
            else if (Taryfa == "System.Windows.Controls.ComboBoxItem: 60 min")
            {
                baza = 6.0m;
            }
            else if (Taryfa == "System.Windows.Controls.ComboBoxItem: 24 godziny")
            {
                baza = 16.0m;
            }

            return baza;
        }

        static decimal WspolczynnikUlgi(int wiek, bool uczen)
        {
            decimal ulga = 1;
            if(wiek <5 || wiek > 70)
            {
                ulga = 0;
            }
            else if (uczen)
            {
                ulga = 0.5m;
            }

            return ulga;
        }


        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            string taryfa;
            int wiek;
            bool uczen = false;
            bool nocna = false;

            taryfa = Taryfa.SelectedValue.ToString();
            //MessageBox.Show(taryfa);
            wiek = int.Parse(Wiek.Text);
            if(Uczen.IsChecked != true)
            {
                uczen = false;
            }
            else if(Uczen.IsChecked == true)
            {
                uczen = true;
            }

            if (Nocna.IsChecked != true)
            {
                nocna = false;
            }
            else if (Nocna.IsChecked == true)
            {
                nocna = true;
            }

            decimal baza = CenaBazowa(taryfa);
            decimal ulga = WspolczynnikUlgi(wiek, uczen);

            decimal CenaBiletu;

            if (nocna)
            {
                CenaBiletu = (baza + 2.00m) * ulga;
            }
            else
            {
                CenaBiletu = baza * ulga;
            }

            MessageBox.Show("Cena biletu to: " + CenaBiletu);

        }
    }
}