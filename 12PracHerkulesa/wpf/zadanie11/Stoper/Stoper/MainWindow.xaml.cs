using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Media;
using System.Windows.Threading;

namespace Stoper
{
    public partial class MainWindow : Window
    {
        private Stopwatch stoper = new Stopwatch();
        private DispatcherTimer timer;
        private TimeSpan ostatniMiedzyczas = TimeSpan.Zero;
        private int numerOkrążenia = 0;
        private TimeSpan najszybszeOkrążenie = TimeSpan.MaxValue;
        private int numerNajszybszego = 0;
        private bool dziala = false;

        public MainWindow()
        {
            InitializeComponent();

            timer = new DispatcherTimer();
            timer.Interval = TimeSpan.FromMilliseconds(100);
            timer.Tick += Timer_Tick;
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            txtCzas.Text = FormatujCzas(stoper.Elapsed);
        }

        private string FormatujCzas(TimeSpan czas)
        {
            return string.Format("{0:00}:{1:00}.{2:0}",
                (int)czas.TotalMinutes,
                czas.Seconds,
                czas.Milliseconds / 100);
        }

        private void btnStart_Click(object sender, RoutedEventArgs e)
        {
            if (!dziala)
            {
                // Start
                stoper.Start();
                timer.Start();
                dziala = true;

                btnStart.Content = "Stop";
                btnStart.Background = Brushes.Red;
                btnMiedzyczas.IsEnabled = true;
                btnReset.IsEnabled = false;
            }
            else
            {
                // Stop
                stoper.Stop();
                timer.Stop();
                dziala = false;

                btnStart.Content = "Start";
                btnStart.Background = Brushes.LimeGreen;
                btnMiedzyczas.IsEnabled = false;
                btnReset.IsEnabled = true;
            }
        }

        /*****************************************************
         nazwa funkcji:        btnMiedzyczas_Click
         opis funkcji:         Zapisuje międzyczas (długość okrążenia)
                               od poprzedniego międzyczasu, dodaje go
                               do listy i aktualizuje informację
                               o najszybszym okrążeniu.
         parametry:            sender - obiekt wywołujący zdarzenie
                               e - argumenty zdarzenia
         zwracany typ i opis:  brak
         autor:                Dawid Nocinski
        *****************************************************/
        private void btnMiedzyczas_Click(object sender, RoutedEventArgs e)
        {
            TimeSpan aktualnyCzas = stoper.Elapsed;
            TimeSpan czasOkrążenia = aktualnyCzas - ostatniMiedzyczas;

            numerOkrążenia++;
            ostatniMiedzyczas = aktualnyCzas;

            string tekst = $"Okr. {numerOkrążenia} – {FormatujCzas(czasOkrążenia)}";
            lstMiedzyczasy.Items.Add(tekst);

            // Aktualizacja najszybszego okrążenia
            if (czasOkrążenia < najszybszeOkrążenie)
            {
                najszybszeOkrążenie = czasOkrążenia;
                numerNajszybszego = numerOkrążenia;
            }

            txtNajszybsze.Text = $"Najszybsze okrążenie: Okr. {numerNajszybszego} – {FormatujCzas(najszybszeOkrążenie)}";
        }

        private void btnReset_Click(object sender, RoutedEventArgs e)
        {
            stoper.Reset();
            ostatniMiedzyczas = TimeSpan.Zero;
            numerOkrążenia = 0;
            najszybszeOkrążenie = TimeSpan.MaxValue;
            numerNajszybszego = 0;

            txtCzas.Text = "00:00.0";
            lstMiedzyczasy.Items.Clear();
            txtNajszybsze.Text = "Najszybsze okrążenie: –";

            btnStart.Content = "Start";
            btnStart.Background = Brushes.LimeGreen;
            btnMiedzyczas.IsEnabled = false;
            btnReset.IsEnabled = false;
            dziala = false;
        }
    }
}